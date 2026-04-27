import {
  BadgeInfo,
  BarChart3,
  ChevronLeft,
  Lock,
  SquarePlus,
  Users,
} from "lucide-react";
import Link from "next/link";

function GoogleBrandIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="37"
      viewBox="0 0 40 37"
      fill="none"
    >
      <path
        d="M22.8742 0.772608C20.1246 -0.81786 16.6088 0.125968 15.0213 2.88073L0.771124 27.6096C-0.816298 30.3644 0.125733 33.8869 2.87526 35.4774C5.6248 37.0678 9.14066 36.124 10.7282 33.3693L24.9784 8.64034C26.5658 5.88558 25.6237 2.36308 22.8742 0.772608Z"
        fill="#FFC107"
      />
      <path
        d="M22.874 0.772841C21.5897 0.0299505 20.1383 -0.159737 18.7941 0.12956C19.3794 0.255751 19.9414 0.472807 20.4595 0.772841C23.209 2.36331 24.1512 5.88581 22.5637 8.64058L8.3135 33.3695C7.46756 34.8374 6.07396 35.7909 4.54053 36.1209C6.91506 36.6331 9.44818 35.5903 10.7279 33.3695L24.9781 8.64058C26.5657 5.88581 25.6236 2.36331 22.874 0.772841Z"
        fill="#FFB300"
      />
      <path
        d="M5.74266 36.2502C8.91424 36.2502 11.4853 33.6743 11.4853 30.4967C11.4853 27.3191 8.91424 24.7432 5.74266 24.7432C2.57107 24.7432 0 27.3191 0 30.4967C0 33.6743 2.57107 36.2502 5.74266 36.2502Z"
        fill="#4CAF50"
      />
      <path
        d="M4.54074 36.1208L4.54004 36.1227C4.93534 36.2073 5.33845 36.25 5.7427 36.2501C8.91426 36.2501 11.4854 33.6741 11.4854 30.4965C11.486 29.8115 11.3641 29.1319 11.1257 28.4897L8.31379 33.3694C7.46777 34.8373 6.07418 35.7907 4.54074 36.1208Z"
        fill="#43A047"
      />
      <path
        d="M39.2288 27.6096L24.9787 2.88073C23.3913 0.125968 19.8754 -0.81786 17.1258 0.772608C14.3763 2.36308 13.4341 5.88558 15.0216 8.64034L29.2719 33.3693C30.8593 36.124 34.3752 37.0678 37.1248 35.4774C39.8742 33.8869 40.8163 30.3643 39.2288 27.6096Z"
        fill="#2196F3"
      />
      <path
        d="M39.2286 27.6095L24.9784 2.88068C23.6986 0.659822 21.1655 -0.382991 18.791 0.129275C20.3244 0.459275 21.718 1.41271 22.564 2.88068L36.8142 27.6096C38.4017 30.3644 37.4596 33.8869 34.7101 35.4773C34.1919 35.7773 33.63 35.9944 33.0447 36.1206C34.3888 36.4099 35.8402 36.2202 37.1246 35.4773C39.874 33.8869 40.8161 30.3643 39.2286 27.6095Z"
        fill="#1E88E5"
      />
    </svg>
  );
}

export default function GoogleIntegrationContent() {
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
              <GoogleBrandIcon />
            </div>

            <h1 className="mt-4 text-xl font-semibold leading-tight text-[#1f1f1f] sm:text-2xl md:text-[28px]">
              Connect with Google Ads
            </h1>
            <p className="mx-auto mt-2 max-w-70 text-sm text-[#9A9AA0] sm:max-w-md sm:text-base">
              Connect your Google Ads account to sync profile, manage content, and
              track performance.
            </p>
          </div>

          <div className="mt-10 sm:mt-16">
            <h2 className="text-center text-base font-medium text-[#262626] sm:text-left sm:text-lg">
              Benefits of Connecting Google Ads
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
                      Automatically sync your Google Ads campaigns and profile
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
                      Monitor your ad performance and audience insights.
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

          {/* Google Ads Connect Card */}
          <div className="mt-10 rounded-2xl border border-[#E5E7EB] bg-[#FBFBFB] p-6 text-center sm:p-8 sm:text-left md:mt-12 md:rounded-xl">
            <h3 className="text-lg font-semibold leading-tight text-[#3a3a3a] sm:text-xl">
              Connect Your Google Ads Account
            </h3>
            <p className="mt-2 text-sm text-[#9a9a9a] sm:text-base">
              You&apos;ll be redirected to Google Ads to authorize access.
            </p>

            <button
              type="button"
              className="mt-6 h-12 w-full rounded-xl bg-[#1F3A5F] px-8 text-base font-medium text-white transition-all active:scale-95 md:rounded-md"
            >
              Connect Google Ads
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
