import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';

let cognitoClient: CognitoIdentityProviderClient;

export function getCognitoClient() {
  if (!cognitoClient)
    cognitoClient = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION,
    });

  return cognitoClient;
}
