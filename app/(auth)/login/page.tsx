// import SociaMediaLoginForm from '@/components/forms/auth/socia-media-login-form';
import LoginForm from '@/components/forms/auth/login-form';
import Link from "next/link";
import Image from "next/image";
import backgroundImg from "@/public/login-background.svg";
import logoImg from "@/public/w-logo.svg";
import SociaMediaLoginButton from '@/components/forms/auth/social-media-login-form';

export default function LoginPage() {
  return (
    <div className="flex w-full">
      <div className="hidden md:block w-2/6 h-screen ">
        <Image
          src={backgroundImg}
          alt="Login background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-4/6 p-10 flex flex-col items-center justify-center max-w-5xl m-auto gap-8">
        <div className="flex flex-col gap-6 items-center">
          <Image src={logoImg} alt="Logo" className="w-48" />
          <p className="text-3xl font-semibold text-center text-text-primary sm:text-5xl">
            Bienvenido de vuelta
          </p>
        </div>

        <LoginForm />

        <div className="flex items-center justify-center gap-2 w-full">
          <span className="w-60 border-b-2 border-border-secondary" />
          <p className="text-gray-300">o</p>
          <span className="w-60 border-b-2 border-border-secondary" />
        </div>

        <div className="flex items-center justify-center w-full">
          <SociaMediaLoginButton provider={'google'}  />
        </div>

        <div className="flex items-center justify-center gap-2 w-full text-sm">
          <p className="text-secondary-400">¿Primera vez en wedin? Registrate en un minuto</p>
          <Link
            href="/register"
            className="flex justify-center items-center border border-border-default bg-gray-600 rounded-md text-text-secondary font-medium px-4 py-2 hover:opacity-65 cursor-pointer transition-all duration-150"
          >
            Registrate
          </Link>
        </div>
      </div>
    </div>
  );
}
