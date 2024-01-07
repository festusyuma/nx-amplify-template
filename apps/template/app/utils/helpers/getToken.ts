import { fetchAuthSession } from 'aws-amplify/auth/server';
import { cookies } from 'next/headers';

import { serverContext } from './serverContext';

export async function getToken() {
  const res = await serverContext({
    nextServerContext: { cookies },
    operation(ctx) {
      return fetchAuthSession(ctx);
    },
  });

  return `lambda.${res.tokens?.accessToken.toString()}`;
}
