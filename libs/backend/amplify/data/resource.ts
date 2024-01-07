import {
  a,
  type ClientSchema,
  defineData,
  defineFunction
} from '@aws-amplify/backend';

const schema = a.schema({
  Profile: a
    .model({
      firstName: a.string().required(),
      lastName: a.string().required(),
      bio: a.string(),
      profileImage: a.url()
    })
    .authorization([a.allow.private()]),
  CustomResponse: a.customType({
    id: a
      .string()
      .required()
      .authorization([a.allow.public()])
  }),
  customMutation: a
    .mutation()
    .arguments({
      email: a.string().required(),
      password: a.string().required()
    })
    .returns(a.ref('CustomResponse'))
    .function('customResolver')
    .authorization([a.allow.public()])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30
    }
  },
  functions: {
    customResolver: defineFunction({
      entry: '../functions/custom-resolver/index.ts',
      name: 'custom-resolver',
      runtime: 20
    })
  }
});
