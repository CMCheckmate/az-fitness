import Image from 'next/image'

export default function HomePage() {
  return (
    <main className=''>
      <div className='p-10 text-center'>
        <h1 className='text-4xl text-red-600 font-bold'>Build a better you!</h1>
        <h2 className='text-2xl text-red-600'>Personal training tailored to your needs</h2>
        <div className='flex items-center justify-center'>
          <Image src='/placeholder.svg' alt='Placeholder' className='p-5' width={500} height={0} />
        </div>
      </div>

      <br></br>
      <div className='p-10 text-center bg-red-500'>
        <h2 className='text-2xl text-white font-bold'>Why choose personal training?</h2>
        <h3 className='text-white'>Your Body, the Way You Want It</h3>
        <p className='pt-10 text-white'>
          Getting in shape shouldn’t be a punishment. It’s an amazing and empowering lifestyle decision that anyone can make. 
          I believe in finding the pleasurable side of fitness; 
          and while there may be a sore muscle or two along the way, the benefits of fitness are worth the challenge. 
          I have developed my training regime by working with a variety of people, and constantly adapting my program to the needs of my new clients.
        </p>
        <div className='flex items-center justify-center'>
          <Image src='/placeholder.svg' alt='Placeholder' className='p-5' width={500} height={0} />
        </div>
      </div>

      <br></br>
      <div className='p-10 text-center'>
        <h2 className='text-2xl text-red-600 font-bold'>Services</h2>
        <p className='text-red-600'>
          Provide a general description of the items below and introduce the services you offer. Click on the text box to edit the content.
        </p>
        <div className='grid grid-cols-3'>
          <Image src='/placeholder.svg' alt='Placeholder' className='p-5' width={500} height={0} />
          <Image src='/placeholder.svg' alt='Placeholder' className='p-5' width={500} height={0} />
          <Image src='/placeholder.svg' alt='Placeholder' className='p-5' width={500} height={0} />
        </div>
      </div>

      <br></br>
      <div className='flex items-center justify-center p-10 text-center bg-red-500'>
        <Image src='/placeholder.svg' alt='Placeholder' className='p-5' width={500} height={0} />
        <div className=''>
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
