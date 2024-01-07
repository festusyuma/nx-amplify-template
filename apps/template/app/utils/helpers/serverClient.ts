import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/data';
import config from '@template/backend/config';
import { Schema } from '@template/backend/data';
import { cookies } from 'next/headers';

export const serverClient = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
  authMode: 'userPool',
});
