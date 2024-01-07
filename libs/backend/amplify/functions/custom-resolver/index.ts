import {
  AmplifyGraphQlResolverEvent,
  AmplifyGraphQlResolverHandler,
} from 'aws-lambda/';

import { createInstitutionGroups } from './resolvers/create-institution-groups';
import { createUser } from './resolvers/create-user';

const handlers: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string, (args: AmplifyGraphQlResolverEvent<any>) => Promise<unknown>>
> = {
  Mutation: {
    createUser,
    createInstitutionGroups,
  },
};

export const handler: AmplifyGraphQlResolverHandler = (event) => {
  const resolver = handlers[event.typeName]?.[event.fieldName];
  if (!resolver) throw new Error('no handler found');

  return resolver(event);
};
