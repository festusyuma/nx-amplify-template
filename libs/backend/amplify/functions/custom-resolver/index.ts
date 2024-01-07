import {
  AmplifyGraphQlResolverEvent,
  AmplifyGraphQlResolverHandler
} from 'aws-lambda/';

import { customMutation } from './resolvers/custom-mutation';

const handlers: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string, (args: AmplifyGraphQlResolverEvent<any>) => Promise<unknown>>
> = {
  Mutation: {
    customMutation
  }
};

export const handler: AmplifyGraphQlResolverHandler = (event) => {
  const resolver = handlers[event.typeName]?.[event.fieldName];
  if (!resolver) throw new Error('no handler found');

  return resolver(event);
};
