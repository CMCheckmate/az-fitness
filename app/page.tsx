import Image from 'next/image'
import Gallery from '@/app/ui/gallery'
import placeholder from '@/public/placeholder.svg'
import training from '@/public/training.png'
import profile from '@/public/profile.png'

export default function HomePage() {
  return (
    <main>
      <div className='py-5'>
        <div className='p-10 text-center'>
          <h1 className='text-5xl text-red-600 font-bold'>Build a better you!</h1>
          <h2 className='text-xl text-red-600'>Personal training tailored to your needs</h2>
        </div>
        <Gallery />
      </div>

      <div className='bg-red-600'>
        <div className='p-10 text-center'>
          <h2 className='text-3xl text-white font-bold'>Why choose personal training?</h2>
          <h3 className='text-white'>Your Body, the Way You Want It</h3>
          <p className='pt-10 text-white'>
            Getting in shape shouldn’t be a punishment. It’s an amazing and empowering lifestyle decision that anyone can make.
            I believe in finding the pleasurable side of fitness;
            and while there may be a sore muscle or two along the way, the benefits of fitness are worth the challenge.
            I have developed my training regime by working with a variety of people, and constantly adapting my program to the needs of my new clients.
          </p>
        </div>
        <Image src={training} alt='Training' className='w-full object-cover' />
      </div>

      <div className='p-10 text-center'>
        <h2 className='p-5 text-3xl text-red-600 font-bold'>Services</h2>
        <p className='text-red-600'>
          Provide a general description of the items below and introduce the services you offer. Click on the text box to edit the content.
        </p>
        <div className='p-20 grid grid-cols-3'>
          <div className='p-5 flex flex-col items-center'>
            <Image src={placeholder} alt='Placeholder 1' className='w-3/4 p-5 rounded-full' />
            <h3 className='p-5 text-2xl text-red-600 font-bold'>Service 1</h3>
            <p className='text-red-600'>
              Describe your service here. What makes it great? 
              Use short catchy text to tell people what you offer, and the benefits they will receive. 
              A great description gets readers in the mood, and makes them more likely to go ahead and book.
            </p>
          </div>
          <div className='p-5 flex flex-col items-center'>
            <Image src={placeholder} alt='Placeholder 2' className='w-3/4 p-5 rounded-full' />
            <h3 className='p-5 text-2xl text-red-600 font-bold'>Service 2</h3>
            <p className='text-red-600'>
              Describe your service here. What makes it great?
              Use short catchy text to tell people what you offer, and the benefits they will receive.
              A great description gets readers in the mood, and makes them more likely to go ahead and book.
            </p>
          </div>
          <div className='p-5 flex flex-col items-center'>
            <Image src={placeholder} alt='Placeholder 3' className='w-3/4 p-5 rounded-full' />
            <h3 className='p-5 text-2xl text-red-600 font-bold'>Service 3</h3>
            <p className='text-red-600'>
              Describe your service here. What makes it great?
              Use short catchy text to tell people what you offer, and the benefits they will receive.
              A great description gets readers in the mood, and makes them more likely to go ahead and book.
            </p>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center p-10 text-center bg-red-600'>
        <div className='bg-white'>
          <Image src={profile} alt='Profile' className='relative left-4 bottom-4'/>
        </div>
        <div className='px-5'>
          <h2 className='text-4xl text-white font-bold'>Aran Ziegler</h2>
          <h3 className='text-xl text-white'>Personal Trainer</h3>
          <ul className='p-5 text-white'>
            <li>Registered with the NZ Registry of Exercise Professionals</li>
            <li>Qualified Personal Trainer - Level 5</li>
            <li>Advanced First Aid Certified (Level 2)</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
