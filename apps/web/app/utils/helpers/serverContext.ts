import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import config from '@template/backend/config';

export const { runWithAmplifyServerContext: serverContext } =
  createServerRunner({
    config,
  });
