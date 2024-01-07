import type {
  AmplifyGraphQlResolverEvent
} from 'aws-lambda';

export async function customMutation(
  event: AmplifyGraphQlResolverEvent<unknown>
): Promise<unknown> {
  return { id: 'id' };
}
