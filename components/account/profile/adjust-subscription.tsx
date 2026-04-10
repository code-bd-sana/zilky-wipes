"use client";

import { useRouter } from "next/navigation";

type ButtonAction =
  | "skip-delivery"
  | "pause-subscription"
  | "check-frequency"
  | "order";

export default function AdjustSubscription() {
  const router = useRouter();

  const adjustData: {
    title: string;
    subTitle: string;
    buttonText: string;
    buttonAction: ButtonAction;
  }[] = [
    {
      title: "Skip next delivery",
      subTitle: "Your next delivery will be April 12",
      buttonText: "Skip",
      buttonAction: "skip-delivery",
    },
    {
      title: "Change frequency",
      subTitle: "Currently every Every 1 months",
      buttonText: "Adjust",
      buttonAction: "check-frequency",
    },
    {
      title: "Pause indefinitely",
      subTitle: "Resume anytime — no charges while paused",
      buttonText: "Pause",
      buttonAction: "pause-subscription",
    },
    {
      title: "Order extra now",
      subTitle: "One-time purchase, ships within 2 days",
      buttonText: "Order",
      buttonAction: "order",
    },
  ];

  const handleButtonAction = (action: ButtonAction) => {
    if (action === "skip-delivery") {
      console.log("Skip delivery button clicked");
      return;
    }

    if (action === "pause-subscription") {
      console.log("Pause subscription button clicked");
      return;
    }

    if (action === "check-frequency") {
      console.log("Check frequency button clicked");
      return;
    }

    if (action === "order") {
      console.log("Order button clicked");
      router.push("/shop");
      return;
    }
  };

  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150'>
      <div className='bg-[#FBFAF9] p-4 border border-[#E5E5E5] rounded-[8px] mt-4'>
        <p className='text-[#979191] text-base'>Adjust Your Subscription</p>

        <div className='mt-6 space-y-4'>
          {adjustData.map((item) => (
            <div
              key={item.buttonAction}
              className='flex flex-col md:flex-row gap-y-3 p-4 justify-between'>
              <div className='flex flex-col'>
                <h3 className='text-base text-[#474747]'>{item.title}</h3>
                <p className='mt-2 text-sm text-[#979191]'>{item.subTitle}</p>
              </div>
              <button
                type='button'
                onClick={() => handleButtonAction(item.buttonAction)}
                className='rounded-[8px] border border-[#E5E5E5] w-28 h-10 text-sm text-[#474747] flex items-center justify-center cursor-pointer hover:bg-(--text-primary) hover:text-white transition-colors duration-200'>
                {item.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
