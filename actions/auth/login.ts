'use server';

import { signIn } from '@/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { LoginSchema } from '@/schemas/auth';
import AuthError from 'next-auth';
import type * as z from 'zod';
import { getLoginUserByEmail } from '../data/user';

export const checkUserExists = async (email: string) => {
  const existingUser = await getLoginUserByEmail(email);
  return !!existingUser;
};

export const login = async (
  values: z.infer<typeof LoginSchema>,
  type = 'credentials',
  redirectTo = '/dashboard'
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  if (validatedFields.success) {
    const { email, password } = validatedFields.data;

    const existingUser = await getLoginUserByEmail(email);

    if (!existingUser) {
      return { error: 'Usuario no encontrado' };
    }

    if (!existingUser.emailVerified) {
      await generateVerificationToken(email);

      // send email
    }

    if (existingUser.password === null) {
      return { error: 'Deberias de ingresar sin contraseña' };
    }

    try {
      await signIn(type, {
        email,
        password,
        redirectTo,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        const authError = error as (typeof AuthError) & { type: string };
        switch (authError.type) {
          case 'CredentialsSignin':
            return { error: 'Credenciales incorrectas' };
          default:
            return { error: 'An error occurred' };
        }
      }

      throw error;
    }
  }
};
