import Image from "next/image";
import LoginForm from "./login-form";

export default function LoginPageContent() {
  return (
    <section className='relative w-full overflow-hidden'>
      {/* Hero container */}
      <div className='absolute inset-0 w-full h-full overflow-hidden'>
        {/* Image Background */}
        <Image
          src='/ZilkyWipes/1000308870.png'
          alt='Login'
          fill
          className='absolute inset-0 w-full h-full object-cover '
        />
        <div className='absolute inset-0 bg-black/50' />
      </div>
      {/* Content overlay */}
      <div className='relative z-10 mx-4 md:mx-11.5 h-svh overflow-y-auto py-6 md:py-10'>
        <div className='mx-auto flex min-h-full w-full items-center justify-center'>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
