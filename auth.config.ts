import prismaClient from '@/prisma/client';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
// import Facebook from 'next-auth/providers/facebook';
import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { LoginSchema } from '@/schemas/auth';

const getUser = async (email: string, password: string) => {
  const user = await prismaClient.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);

  return isValid ? user : null;
};

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    // Facebook({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    //   allowDangerousEmailAccountLinking: true,
    // }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        return await getUser(email, password);
      },
    }),
  ],
} ;
