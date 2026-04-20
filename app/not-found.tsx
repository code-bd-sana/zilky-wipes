import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className='bg-white min-h-dvh py-6 px-4 sm:py-8 sm:px-6 flex flex-col'>
      {/* Logo at the top center */}
      <div className='flex justify-center mb-8 sm:mb-10 shrink-0'>
        <Link href='/' className='inline-block'>
          <Image
            src='/Logo/Logo-02.svg'
            alt='ZilkyWipes'
            width={190}
            height={52}
            priority
            className='h-9 sm:h-10 md:h-12 w-auto object-contain'
          />
        </Link>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex items-center justify-center pb-12'>
        <div className='w-full max-w-md sm:max-w-lg text-center'>
          {/* 404 Illustration / Text */}
          <div className='mb-8'>
            <h1 className='text-[120px] sm:text-[160px] font-bold text-(--text-primary) leading-none tracking-tighter'>
              404
            </h1>
            <p className='text-2xl sm:text-3xl font-semibold text-(--text-primary) -mt-4'>
              Page Not Found
            </p>
          </div>

          <div className='space-y-4 mb-10'>
            <p className='text-sm sm:text-base text-(--shop-pagination-text) max-w-xs mx-auto'>
              Oops! The page you&apos;re looking for doesn&apos;t exist or has
              been moved.
            </p>
          </div>

          {/* Back to Home Button */}
          <Link
            href='/'
            className='inline-block w-full sm:w-auto px-10 py-3.5 sm:py-4 bg-(--cart-panel-bg) text-white font-semibold rounded-full hover:bg-[#16253d] active:scale-[0.98] transition-all duration-150 text-base'>
            Go Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
