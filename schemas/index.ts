import { Prisma } from '@prisma/client';
import * as z from 'zod';

export const formSchema = z.object({
  company: z.string().min(3),
  logo: z.string().url(),
  logoBackground: z.string(),
  position: z.string().min(3),
  contract: z.string().min(3),
  location: z.string().min(3),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters long',
  }),
  website: z.string().url(),
  apply: z.string().url(),

  //add requirements as object with array of strings
  requirements: z
    .object({
      content: z.string().min(3),
      items: z.array(z.string().min(3)),
    })
    .nonstrict() as any,

  role: z
    .object({
      content: z.string().min(3),
      items: z.array(z.string().min(3)),
    })
    .nonstrict() as any,
});
