import Image from "next/image";
import ForgotPasswordForm from "./forgot-password-form";

export default function ForgotPasswordPageContent() {
  return (
    <section className='relative w-full overflow-hidden'>
      <div className='absolute inset-0 w-full h-full overflow-hidden'>
        <Image
          src='/auth/auth.png'
          alt='Forgot password'
          fill
          className='absolute inset-0 w-full h-full object-cover'
        />

        <div className='absolute inset-0' />
      </div>

      <div className='relative z-10 mx-4 md:mx-11.5 h-svh overflow-y-auto py-6 md:py-10'>
        <div className='mx-auto flex min-h-full w-full items-center justify-center'>
          <ForgotPasswordForm />
        </div>
      </div>
    </section>
  );
}
