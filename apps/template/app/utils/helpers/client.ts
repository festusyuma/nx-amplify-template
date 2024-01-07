import { generateClient } from 'aws-amplify/data';
import { Schema } from '@template/backend/data';

export const client = generateClient<Schema>({
  authMode: 'userPool',
});
