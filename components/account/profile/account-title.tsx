"use client";

import PageTitle from "@/components/shared/page-title/page-title";
import { useGetMySubscriptions } from "@/hooks/useSubscriptions";
import { format } from "date-fns";

export default function AccountTitle() {
  const { data: response } = useGetMySubscriptions();
  const subscriptions = response?.data || [];
  const activeSubscription = subscriptions.find((sub) => sub.status === "ACTIVE" || sub.status === "PAUSED");

  let title = "Welcome back to Zilky Wipes!";
  let subtitle = "Manage your account, track orders, and update subscriptions.";
  let badgeText = "No active subscription";

  if (activeSubscription) {
    badgeText = activeSubscription.status === "PAUSED" ? "Paused subscription" : "Active subscription";
    
    if (activeSubscription.nextBillingDate) {
      const formattedDate = format(new Date(activeSubscription.nextBillingDate), "MMMM d");
      title = `Your next delivery is scheduled for ${formattedDate}`;
      
      const frequency = activeSubscription.frequency.toLowerCase();
      const frequencyMap: Record<string, string> = {
        '1-month': 'month',
        '2-months': '2 months',
        '3-months': '3 months',
        '1-week': 'week',
        '2-weeks': '2 weeks'
      };
      
      const freqText = frequencyMap[frequency] || frequency;
      subtitle = `You're set for the next ${freqText}`;
    }
  }
  return (
    <section className='mt-30 mx-6'>
      <div className='flex justify-center'>
        <button
          type='button'
          className='text-(--text-primary) text-center border border-(--text-primary) rounded-full px-3 py-2'>
          <ul className='flex items-center gap-2'>
            <li
              aria-hidden='true'
              className='list-none h-2 w-2 rounded-full bg-(--text-primary)'
            />
            <li className='list-none text-sm'>{badgeText}</li>
          </ul>
        </button>
      </div>
      <div className='my-8'>
        <PageTitle
          align='center'
          title={title}
          titleClassName='text-[#474747]!'
          subtitle={[subtitle]}
          subtitleClassName='text-[#474747]! text-base! mt-6'
        />
      </div>
    </section>
  );
}
