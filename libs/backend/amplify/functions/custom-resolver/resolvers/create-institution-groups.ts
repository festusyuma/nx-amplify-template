import { CreateGroupCommand } from '@aws-sdk/client-cognito-identity-provider';
import type { AmplifyGraphQlResolverEvent } from 'aws-lambda';

import {
  ApiBaseResponse,
  CreateInstitutionGroupsMutationVariables,
} from '../../../../graphql/API';
import { UserGroup } from '../../../../types';
import { getCognitoClient } from './utils/cognito-client';
import { secrets } from './utils/secrets';

export async function createInstitutionGroups(
  event: AmplifyGraphQlResolverEvent<CreateInstitutionGroupsMutationVariables>
): Promise<Omit<ApiBaseResponse, '__typename'> | undefined> {
  const client = getCognitoClient();
  const institution = event.arguments.institution;

  try {
    await client.send(
      new CreateGroupCommand({
        GroupName: `${institution}:${UserGroup.ADMIN}`,
        UserPoolId: secrets('USER_POOL_ID'),
        Precedence: 2,
      })
    );

    await client.send(
      new CreateGroupCommand({
        GroupName: `${institution}:${UserGroup.TEACHER}`,
        UserPoolId: secrets('USER_POOL_ID'),
        Precedence: 3,
      })
    );

    await client.send(
      new CreateGroupCommand({
        GroupName: `${institution}:${UserGroup.STUDENT}`,
        UserPoolId: secrets('USER_POOL_ID'),
        Precedence: 4,
      })
    );
  } catch (e) {
    console.error(`create user error :: `, e);
    throw e;
  }

  return { success: true };
}
