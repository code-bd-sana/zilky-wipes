import {
  BadgeInfo,
  BarChart3,
  ChevronLeft,
  Lock,
  SquarePlus,
  Users,
} from "lucide-react";
import Link from "next/link";

function AmazonBrandIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='40'
      height='40'
      viewBox='0 0 40 40'
      fill='none'>
      <g clipPath='url(#clip0_1413_35400)'>
        <path
          d='M17.3409 26.3955C16.0045 26.3955 14.8136 26.1636 13.7682 25.7C12.7227 25.2273 11.8955 24.5318 11.2864 23.6136C10.6864 22.6864 10.3864 21.5318 10.3864 20.15C10.3864 18.9864 10.6 18.0091 11.0273 17.2182C11.4545 16.4273 12.0364 15.7909 12.7727 15.3091C13.5091 14.8273 14.3455 14.4636 15.2818 14.2182C16.2273 13.9727 17.2182 13.8 18.2545 13.7C19.4727 13.5727 20.4545 13.4545 21.2 13.3455C21.9455 13.2273 22.4864 13.0545 22.8227 12.8273C23.1591 12.6 23.3273 12.2636 23.3273 11.8182V11.7364C23.3273 10.8727 23.0545 10.2045 22.5091 9.73182C21.9727 9.25909 21.2091 9.02273 20.2182 9.02273C19.1727 9.02273 18.3409 9.25455 17.7227 9.71818C17.1045 10.1727 16.6955 10.7455 16.4955 11.4364L11.1227 11C11.3955 9.72727 11.9318 8.62727 12.7318 7.7C13.5318 6.76364 14.5636 6.04545 15.8273 5.54545C17.1 5.03636 18.5727 4.78182 20.2455 4.78182C21.4091 4.78182 22.5227 4.91818 23.5864 5.19091C24.6591 5.46364 25.6091 5.88636 26.4364 6.45909C27.2727 7.03182 27.9318 7.76818 28.4136 8.66818C28.8955 9.55909 29.1364 10.6273 29.1364 11.8727V26H23.6273V23.0955H23.4636C23.1273 23.75 22.6773 24.3273 22.1136 24.8273C21.55 25.3182 20.8727 25.7045 20.0818 25.9864C19.2909 26.2591 18.3773 26.3955 17.3409 26.3955ZM19.0045 22.3864C19.8591 22.3864 20.6136 22.2182 21.2682 21.8818C21.9227 21.5364 22.4364 21.0727 22.8091 20.4909C23.1818 19.9091 23.3682 19.25 23.3682 18.5136V16.2909C23.1864 16.4091 22.9364 16.5182 22.6182 16.6182C22.3091 16.7091 21.9591 16.7955 21.5682 16.8773C21.1773 16.95 20.7864 17.0182 20.3955 17.0818C20.0045 17.1364 19.65 17.1864 19.3318 17.2318C18.65 17.3318 18.0545 17.4909 17.5455 17.7091C17.0364 17.9273 16.6409 18.2227 16.3591 18.5955C16.0773 18.9591 15.9364 19.4136 15.9364 19.9591C15.9364 20.75 16.2227 21.3545 16.7955 21.7727C17.3773 22.1818 18.1136 22.3864 19.0045 22.3864Z'
          fill='black'
        />
        <path
          d='M8 30C16 32.6667 24 32.6667 32 30'
          stroke='#FF9900'
          strokeWidth='2.56'
        />
        <path
          d='M32.0002 30.8002C32.442 30.8002 32.8002 30.442 32.8002 30.0002C32.8002 29.5584 32.442 29.2002 32.0002 29.2002C31.5584 29.2002 31.2002 29.5584 31.2002 30.0002C31.2002 30.442 31.5584 30.8002 32.0002 30.8002Z'
          fill='#FF9900'
        />
      </g>
      <defs>
        <clipPath id='clip0_1413_35400'>
          <rect width='40' height='40' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function AmazonIntegrationContent() {
  return (
    <section className='min-h-screen bg-white px-4 pb-16'>
      <div className='max-w-7xl mx-auto mt-5'>
        <Link
          href='/dashboard/integration'
          className='inline-flex items-center gap-1 text-sm text-[#8d8d8d] transition-colors hover:text-[#5e5e5e]'>
          <ChevronLeft className='h-4 w-4' />
          Back to Integrations
        </Link>

        {/* Dynamic Content Container */}
        <div className='mx-auto mt-6 w-full sm:mt-10 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl'>
          <div className='text-center'>
            <div className='flex items-center justify-center gap-4 sm:gap-5'>
              <AmazonBrandIcon />
            </div>

            <h1 className='mt-4 text-xl font-semibold leading-tight text-[#1f1f1f] sm:text-2xl md:text-[28px]'>
              Connect with Amazon Ads
            </h1>
            <p className='mx-auto mt-2 max-w-70 text-sm text-[#9A9AA0] sm:max-w-md sm:text-base'>
              Connect your Amazon Ads account to sync profile, manage content,
              and track performance.
            </p>
          </div>

          <div className='mt-10 sm:mt-16'>
            <h2 className='text-center text-base font-medium text-[#262626] sm:text-left sm:text-lg'>
              Benefits of Connecting Amazon Ads
            </h2>

            <div className='mt-6 space-y-4 md:space-y-6'>
              {/* Feature 1 */}
              <div className='flex flex-col gap-4 rounded-2xl border border-gray-50 bg-gray-50/50 p-5 md:flex-row md:items-center md:justify-between md:border-none md:bg-transparent md:p-0'>
                <div className='flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:text-left md:gap-4'>
                  <span className='inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D6E2F2] bg-[#EFF6FF]'>
                    <SquarePlus className='h-6 w-6 text-[#3B82F6]' />
                  </span>
                  <div>
                    <p className='text-base font-medium text-[#3b3b3b]'>
                      Sync Your Content
                    </p>
                    <p className='text-xs text-[#9a9a9a] sm:text-sm'>
                      Automatically sync your Amazon Ads campaigns and profile
                      information.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className='flex flex-col gap-4 rounded-2xl border border-gray-50 bg-gray-50/50 p-5 md:flex-row md:items-center md:justify-between md:border-none md:bg-transparent md:p-0'>
                <div className='flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:text-left md:gap-4'>
                  <span className='inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D6E2F2] bg-[#EFF6FF]'>
                    <BarChart3 className='h-6 w-6 text-[#3B82F6]' />
                  </span>
                  <div>
                    <p className='text-base font-medium text-[#3b3b3b]'>
                      Track Performance
                    </p>
                    <p className='text-xs text-[#9a9a9a] sm:text-sm'>
                      Monitor your ad performance and audience insights.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className='flex flex-col gap-4 rounded-2xl border border-gray-50 bg-gray-50/50 p-5 md:flex-row md:items-center md:justify-between md:border-none md:bg-transparent md:p-0'>
                <div className='flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:text-left md:gap-4'>
                  <span className='inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D6E2F2] bg-[#EFF6FF]'>
                    <Users className='h-6 w-6 text-[#3B82F6]' />
                  </span>
                  <div>
                    <p className='text-base font-medium text-[#3b3b3b]'>
                      Engage Your Audience
                    </p>
                    <p className='text-xs text-[#9a9a9a] sm:text-sm'>
                      Reply to comments and messages all in one place.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amazon Ads Connect Card */}
          <div className='mt-10 rounded-2xl border border-[#E5E7EB] bg-[#FBFBFB] p-6 text-center sm:p-8 sm:text-left md:mt-12 md:rounded-xl'>
            <h3 className='text-lg font-semibold leading-tight text-[#3a3a3a] sm:text-xl'>
              Connect Your Amazon Ads Account
            </h3>
            <p className='mt-2 text-sm text-[#9a9a9a] sm:text-base'>
              You&apos;ll be redirected to Amazon Ads to authorize access.
            </p>

            <button
              type='button'
              className='mt-6 h-12 w-full rounded-xl bg-[#1F3A5F] px-8 text-base font-medium text-white transition-all active:scale-95 md:rounded-md'>
              Connect Amazon Ads
            </button>

            <p className='mt-5 flex items-center justify-center gap-2 text-xs text-[#9A9AA0] sm:justify-start sm:text-sm'>
              <Lock className='h-3.5 w-3.5' />
              We respect your privacy. Your data is secure with us.
            </p>
          </div>

          {/* Privacy Alert */}
          <div className='mt-6 flex flex-col items-center gap-3 rounded-2xl border border-[#AFC3DA] bg-[#EEF4FB] p-5 text-center sm:flex-row sm:items-start sm:text-left'>
            <BadgeInfo className='h-6 w-6 shrink-0 text-[#1F3A5F]' />
            <div>
              <p className='text-sm font-bold text-[#1F3A5F]'>
                We respect your privacy
              </p>
              <p className='mt-1 text-xs leading-relaxed text-[#1F3A5F]/80 sm:text-sm'>
                You can disconnect your account at any time from the integration
                settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
