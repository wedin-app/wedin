import prismaClient from '@/prisma/client';
import { getLoginUserByEmail } from '@/actions/data/user';

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prismaClient.verificationToken.findFirst({
      where: { identifier: email },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prismaClient.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: 'Token expirado' };
  }

  const existinguser = await getLoginUserByEmail(existingToken.identifier);

  if (!existinguser) {
    return { error: 'Usuario no encontrado' };
  }

  try {
    await prismaClient.user.update({
      where: { email: existingToken.identifier },
      data: { emailVerified: new Date() },
    });
  } catch (error) {
    return { error: 'Error actualizando usuario' };
  }

  try {
    await prismaClient.verificationToken.delete({
      where: { id: existingToken.id },
    });
  } catch (error) {
    return { error: 'Error eliminando token' };
  }
};
