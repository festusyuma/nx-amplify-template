import { z } from 'zod';

const schema = {
  USER_POOL_ID: z.string(),
};

const objectSchema = z.object(schema);

let parsedSecrets: z.infer<typeof objectSchema>;

export function secrets<T extends keyof typeof parsedSecrets>(key: T) {
  if (!parsedSecrets) {
    const res = z.object(schema).safeParse(process.env);
    if (!res.success) throw new Error(res.error.format()._errors.join(', '));
    parsedSecrets = res.data;
  }

  return parsedSecrets[key];
}
