import {
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import type {
  AmplifyGraphQlResolverEvent,
  AppSyncIdentityCognito,
} from 'aws-lambda';

import {
  CreateUserMutationVariables,
  CreateUserResponse,
} from '../../../../graphql/API';
import { UserGroup } from '../../../../types';
import { getCognitoClient } from './utils/cognito-client';
import { secrets } from './utils/secrets';

export async function createUser(
  event: AmplifyGraphQlResolverEvent<CreateUserMutationVariables>
): Promise<Omit<CreateUserResponse, '__typename'> | undefined> {
  const client = getCognitoClient();

  const args = event.arguments;
  const identity = event.identity as AppSyncIdentityCognito;

  let institution = args.institution;
  const isSuperAdmin = identity.groups?.includes(UserGroup.SUPERADMIN);

  if (!isSuperAdmin) {
    if (
      args.group === UserGroup.SUPERADMIN ||
      (!identity.groups?.includes(UserGroup.ADMIN) &&
        (args.group === UserGroup.ADMIN || args.group === UserGroup.TEACHER))
    ) {
      throw new Error('forbidden action');
    }

    institution = identity.claims['custom:institution'];
  } else if (
    isSuperAdmin &&
    !institution &&
    args.group !== UserGroup.SUPERADMIN
  ) {
    throw new Error('institution is required');
  }

  let userRes;
  try {
    const attributes = [
      { Name: 'email_verified', Value: 'true' },
      { Name: 'email', Value: args.email },
    ];

    if (institution)
      attributes.push({ Name: 'custom:institution', Value: institution });

    userRes = await client.send(
      new AdminCreateUserCommand({
        UserPoolId: secrets('USER_POOL_ID'),
        Username: args.email,
        TemporaryPassword: args.password,
        UserAttributes: attributes,
      })
    );
  } catch (e) {
    console.error(`create user error :: `, e);
    throw e;
  }

  if (!userRes.User?.Username) throw new Error('error creating user');

  try {
    await client.send(
      new AdminAddUserToGroupCommand({
        UserPoolId: secrets('USER_POOL_ID'),
        GroupName: args.group,
        Username: userRes.User.Username,
      })
    );

    if (institution) {
      await client.send(
        new AdminAddUserToGroupCommand({
          UserPoolId: secrets('USER_POOL_ID'),
          GroupName: `${institution}:${args.group}`,
          Username: userRes.User.Username,
        })
      );
    }
  } catch (e) {
    // todo notify slack if adding to group fails
    console.error('add user to group error :: ', e);
  }

  return { id: userRes.User.Username };
}
