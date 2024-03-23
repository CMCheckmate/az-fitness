import Image from 'next/image';
import InfoLayout from '@/app/components/info-layout';
import Gallery from '@/app/components/gallery';
import training from '@/public/training.png';
import profile from '@/public/profile.png';
import personalTraining from '@/public/personal_training.png';
import programmeCreation from '@/public/gym_diet.png';
import trackingProgress from '@/public/tracking_progress.png';

function Home() {
  return (
    <div>
      <div className='py-5'>
        <div className='p-10 text-center'>
          <h1 className='text-5xl text-red-600 font-bold'>Build a better you!</h1>
          <h2 className='text-2xl text-red-600'>Personal training tailored to your needs</h2>
        </div>
        <Gallery />
      </div>

      <div className='bg-red-600'>
        <div className='flex justify-center items-center p-10 text-center'>
          <div className='md:w-3/4 min-w-min'>
            <h2 className='text-4xl text-white font-bold'>Why choose personal training?</h2>
            <h3 className='text-2xl text-white'>Your Body, the Way You Want It</h3>
            <p className='text-xl pt-10 text-white'>
              Getting in shape shouldn’t be a punishment. It’s an amazing and empowering lifestyle decision that anyone can make.
              I have developed my training regime by working with a variety of people, and constantly adapting my programs to the needs of my clients.
              As your personal trainer, I will ensure the workouts I give are easy to incorporate into your schedule, sustainable long-term, and will meet all of your individual needs and goals.
            </p>
          </div>
        </div>
        <Image src={training} alt='Training' className='w-full object-cover' />
      </div>

      <div className='p-10 text-center'>
        <h2 className='p-5 text-4xl text-red-600 font-bold'>Services</h2>
        <p className='text-xl text-red-600'>
          My services ensure my clients’ goals are met and that they see constant improvement in their body and lifestyle.
        </p>
        <div className='flex flex-wrap justify-center'>
          <div className='max-w-full flex-1 m-5 flex flex-col items-center'>
            <Image src={personalTraining} alt='Service 1' className='w-1/2 min-w-44 aspect-square p-5 rounded-full' />
            <h3 className='max-w-full p-5 text-2xl text-red-600 font-bold'>Personal Training</h3>
            <p className='max-w-full text-xl text-red-600'>
              Personal training allows me to be there every step of the way, motivating you to push yourself, keeping you safe, and teaching you how to do all exercises properly.
            </p>
          </div>
          <div className='max-w-full flex-1 m-5 flex flex-col items-center'>
            <Image src={programmeCreation} alt='Service 2' className='w-1/2 min-w-44 aspect-square p-5 rounded-full' />
            <h3 className='max-w-full p-5 text-2xl text-red-600 font-bold'>Program Creation</h3>
            <p className='max-w-full text-xl text-red-600'>
              Designing programs based on the parameters you set, fit for your lifestyle and schedule, free for any adjustments or changes you would like to have made to them.
            </p>
          </div>
          <div className='max-w-full flex-1 m-5 flex flex-col items-center'>
            <Image src={trackingProgress} alt='Service 3' className='w-1/2 min-w-44 aspect-square p-5 rounded-full' />
            <h3 className='max-w-full p-5 text-2xl text-red-600 font-bold'>Monitoring Progress</h3>
            <p className='max-w-full text-xl text-red-600'>
              Tracking changes in your fitness level by running fun and harmless tests that we can use to see how you improve and how best to train you over the time you are with me.
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap items-center justify-center p-10 text-center bg-red-600'>
        <div className='max-w-full m-5 bg-white'>
          <Image src={profile} alt='Profile' className='relative left-4 bottom-4' />
        </div>
        <div className='max-w-full p-5'>
          <h2 className='text-4xl text-white font-bold'>Aran Ziegler</h2>
          <h3 className='m-5 text-2xl text-white'>Personal Trainer</h3>
          <ul className='text-xl text-white '>
            <li>Registered with the NZ Registry of Exercise Professionals</li>
            <li>Qualified Personal Trainer (Level 5)</li>
            <li>Advanced First Aid Certified (Level 2)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <InfoLayout content={Home()} />
  );
}
