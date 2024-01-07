import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: 'Verify email',
    },
  },
  userAttributes: {
    email: {
      required: true,
      mutable: false,
    },
  },
});
