import {
  BadgeInfo,
  BarChart3,
  ChevronLeft,
  Lock,
  SquarePlus,
  Users,
} from "lucide-react";
import Link from "next/link";

function TiktokBrandIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <rect width="40" height="40" rx="8" fill="black" />
      <path
        d="M28.0899 14.69C27.0931 14.4708 26.1913 13.9414 25.514 13.1779C24.8367 12.4143 24.4186 11.4559 24.3199 10.44V10H20.8699V23.67C20.8706 24.2766 20.6804 24.868 20.3263 25.3604C19.9722 25.8529 19.4722 26.2215 18.897 26.414C18.3218 26.6065 17.7006 26.6131 17.1214 26.4329C16.5422 26.2527 16.0344 25.8948 15.6699 25.41C15.3433 24.9808 15.1434 24.4689 15.0926 23.932C15.0419 23.3951 15.1423 22.8548 15.3827 22.372C15.623 21.8892 15.9936 21.4834 16.4526 21.2003C16.9116 20.9172 17.4406 20.7681 17.9799 20.77C18.2781 20.7683 18.5749 20.8121 18.8599 20.9V17.4C18.5282 17.3589 18.194 17.3422 17.8599 17.35C16.6292 17.3829 15.4348 17.7739 14.423 18.4753C13.4112 19.1766 12.6258 20.1578 12.1631 21.2986C11.7004 22.4395 11.5804 23.6905 11.8178 24.8986C12.0553 26.1066 12.6398 27.2191 13.4999 28.1C14.3814 28.9962 15.5094 29.6101 16.7406 29.8638C17.9718 30.1175 19.2506 29.9994 20.4146 29.5246C21.5785 29.0498 22.575 28.2397 23.2775 27.1973C23.98 26.1548 24.3568 24.9271 24.3599 23.67V16.67C25.7514 17.6639 27.4199 18.1956 29.1299 18.19V14.79C28.794 14.7914 28.4589 14.7579 28.1299 14.69H28.0899Z"
        fill="white"
      />
    </svg>
  );
}

export default function TiktokIntegrationContent() {
  return (
    <section className="min-h-screen bg-white px-4 pb-16">
      <div className="max-w-7xl mx-auto mt-5">
        <Link
          href="/dashboard/integration"
          className="inline-flex items-center gap-1 text-sm text-[#8d8d8d] transition-colors hover:text-[#5e5e5e]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Integrations
        </Link>

        {/* Dynamic Content Container */}
        <div className="mx-auto mt-6 w-full sm:mt-10 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 sm:gap-5">
              <TiktokBrandIcon />
            </div>

            <h1 className="mt-4 text-xl font-semibold leading-tight text-[#1f1f1f] sm:text-2xl md:text-[28px]">
              Connect with TikTok
            </h1>
            <p className="mx-auto mt-2 max-w-70 text-sm text-[#9A9AA0] sm:max-w-md sm:text-base">
              Connect your TikTok account to sync profile, manage content, and
              track performance.
            </p>
          </div>

          <div className="mt-10 sm:mt-16">
            <h2 className="text-center text-base font-medium text-[#262626] sm:text-left sm:text-lg">
              Benefits of Connecting TikTok
            </h2>

            <div className="mt-6 space-y-4 md:space-y-6">
              {/* Feature 1 */}
              <div className="flex flex-col gap-4 rounded-2xl border border-gray-50 bg-gray-50/50 p-5 md:flex-row md:items-center md:justify-between md:border-none md:bg-transparent md:p-0">
                <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:text-left md:gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D6E2F2] bg-[#EFF6FF]">
                    <SquarePlus className="h-6 w-6 text-[#3B82F6]" />
                  </span>
                  <div>
                    <p className="text-base font-medium text-[#3b3b3b]">
                      Sync Your Content
                    </p>
                    <p className="text-xs text-[#9a9a9a] sm:text-sm">
                      Automatically sync your TikTok videos and profile
                      information.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-4 rounded-2xl border border-gray-50 bg-gray-50/50 p-5 md:flex-row md:items-center md:justify-between md:border-none md:bg-transparent md:p-0">
                <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:text-left md:gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D6E2F2] bg-[#EFF6FF]">
                    <BarChart3 className="h-6 w-6 text-[#3B82F6]" />
                  </span>
                  <div>
                    <p className="text-base font-medium text-[#3b3b3b]">
                      Track Performance
                    </p>
                    <p className="text-xs text-[#9a9a9a] sm:text-sm">
                      Monitor your content performance and audience insights.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col gap-4 rounded-2xl border border-gray-50 bg-gray-50/50 p-5 md:flex-row md:items-center md:justify-between md:border-none md:bg-transparent md:p-0">
                <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:text-left md:gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D6E2F2] bg-[#EFF6FF]">
                    <Users className="h-6 w-6 text-[#3B82F6]" />
                  </span>
                  <div>
                    <p className="text-base font-medium text-[#3b3b3b]">
                      Engage Your Audience
                    </p>
                    <p className="text-xs text-[#9a9a9a] sm:text-sm">
                      Reply to comments and messages all in one place.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TikTok Connect Card */}
          <div className="mt-10 rounded-2xl border border-[#E5E7EB] bg-[#FBFBFB] p-6 text-center sm:p-8 sm:text-left md:mt-12 md:rounded-xl">
            <h3 className="text-lg font-semibold leading-tight text-[#3a3a3a] sm:text-xl">
              Connect Your TikTok Account
            </h3>
            <p className="mt-2 text-sm text-[#9a9a9a] sm:text-base">
              You&apos;ll be redirected to TikTok to authorize access.
            </p>

            <button
              type="button"
              className="mt-6 h-12 w-full rounded-xl bg-[#1F3A5F] px-8 text-base font-medium text-white transition-all active:scale-95 md:rounded-md"
            >
              Connect TikTok
            </button>

            <p className="mt-5 flex items-center justify-center gap-2 text-xs text-[#9A9AA0] sm:justify-start sm:text-sm">
              <Lock className="h-3.5 w-3.5" />
              We respect your privacy. Your data is secure with us.
            </p>
          </div>

          {/* Privacy Alert */}
          <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-[#AFC3DA] bg-[#EEF4FB] p-5 text-center sm:flex-row sm:items-start sm:text-left">
            <BadgeInfo className="h-6 w-6 shrink-0 text-[#1F3A5F]" />
            <div>
              <p className="text-sm font-bold text-[#1F3A5F]">
                We respect your privacy
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#1F3A5F]/80 sm:text-sm">
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
