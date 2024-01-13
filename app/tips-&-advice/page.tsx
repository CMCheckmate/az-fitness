import Image from 'next/image'
import Loader from '@/app/loader'
import placeholder from '@/public/placeholder.svg'

export function TipsAndAdvice() {
    return (
        <div>
            <div className='p-20 bg-gray-100'>
                <h2 className='p-5 text-center text-4xl text-red-600 font-bold'>FITNESS ADVICE FOR YOU</h2>
                <h3 className='text-center text-red-600'>{'What\'s New'}</h3>

                <div className='flex justify-center text-center'>
                    <div className='p-5 flex flex-col items-center'>
                        <Image src={placeholder} alt='Placeholder 1' className='w-3/4 p-5' />
                        <h3 className='p-5 text-2xl text-red-600 font-bold'>HOW TO TRAIN FOR YOUR NEXT MARATHON</h3>
                        <p className='text-red-600'>
                            Add an article, post or exciting update regarding your business.
                            Alternatively, share a professional tip to attract more readers.
                            Choose a great image, photo or video to feature in your post for extra engagement.
                        </p>
                    </div>
                    <div className='p-5 flex flex-col items-center'>
                        <Image src={placeholder} alt='Placeholder 2' className='w-3/4 p-5' />
                        <h3 className='p-5 text-2xl text-red-600 font-bold'>BEACH BODY: FACTS VS MYTHS</h3>
                        <p className='text-red-600'>
                            Add an article, post or exciting update regarding your business.
                            Alternatively, share a professional tip to attract more readers.
                            Choose a great image, photo or video to feature in your post for extra engagement.
                        </p>
                    </div>
                    <div className='p-5 flex flex-col items-center'>
                        <Image src={placeholder} alt='Placeholder 3' className='w-3/4 p-5' />
                        <h3 className='p-5 text-2xl text-red-600 font-bold'>10 WAYS TO LOSE WEIGHT</h3>
                        <p className='text-red-600'>
                            Add an article, post or exciting update regarding your business.
                            Alternatively, share a professional tip to attract more readers.
                            Choose a great image, photo or video to feature in your post for extra engagement.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TipsAndAdvicePage() {
    return (
        <Loader component={TipsAndAdvice()} />
    );
}