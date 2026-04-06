import PageTitle from "@/components/shared/page-title/page-title";
import Image from "next/image";

export default function People() {
  const peopleData = [
    {
      name: "— John Doe.",
      feedback: "I didn’t know I could feel this clean.",
      image: "/home/people-1.png",
    },
    {
      name: "— Sarah Jhonson.",
      feedback: "Once you switch, you can’t go back.",
      image: "/home/people-2.png",
    },
    {
      name: "— Abraham",
      feedback: "Guests always ask",
      image: "/home/people-3.png",
    },
  ];

  return (
    <section className='bg-[#FBFAF9]'>
      <div className='mx-5 md:mx-12 mt-20 md:mt-50 py-25'>
        <PageTitle
          title='People don’t talk about this. ....Until they try it!'
          titleClassName='max-w-250!'
        />
        <div className='flex flex-col md:flex-row justify-center gap-x-8 gap-y-20 mt-25'>
          {peopleData.map((person, index) => (
            <div
              key={index}
              className='w-full max-w-148 mx-auto md:mx-0 md:flex-1'>
              <Image
                height={678}
                width={585}
                src={person.image}
                alt={person.name}
                quality={100}
                sizes='(min-width: 768px) 33vw, 100vw'
                className='w-full aspect-595/624 self-stretch object-cover mb-6'
              />
              <p className='text-2xl text-(--text-primary) '>
                {person.feedback}
              </p>
              <h3 className='text-2xl text-(--text-primary)'>{person.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
