import Image from "next/image";
import SignupForm from "./signup-form";

export default function SignupPageContent() {
  return (
    <section className='w-full h-screen relative overflow-hidden'>
      {/* Hero container */}
      <div className='absolute inset-0 w-full h-full overflow-hidden'>
        {/* Image Background */}
        <Image
          src='/auth/auth.png'
          alt='Signup'
          fill
          className='absolute inset-0 w-full h-full object-cover'
        />

        {/* Dark overlay for text contrast */}
        <div className='absolute inset-0 ' />
      </div>
      {/* Content overlay */}
      <div className='relative z-10 h-full flex items-center justify-center text-center mx-5 md:mx-11.5 py-15'>
        <SignupForm />
      </div>
    </section>
  );
}
