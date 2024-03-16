import Image from 'next/image';
import InfoLayout from '@/app/components/info-layout';
import placeholder from '@/public/placeholder.svg';
import { scrapeWebsite } from '../lib/actions';

function TipsAndAdvice(articles: any[] | null) {
    return (
        <div>
            <div className='p-20 bg-gray-100 text-center'>
                <h2 className='p-5 text-4xl text-red-600 font-bold'>FITNESS ADVICE FOR YOU</h2>
                <h3 className='text-red-600'>{'What\'s New'}</h3>
                <p className='p-5 text-xl font-bold underline'>Fitness Articles from NZ Herald</p>

                {articles && articles.map((article, index) => (
                    <div key={`article${index}`} className='m-20 flex flex-col items-center justify-center'>
                        <img src={article.image} alt={`Article Image ${index}`} className='w-1/2 min-w-36' />
                        <a href={article.link} target='_blank' className='m-5 text-2xl font-bold underline hover:text-gray-600'>{article.title}</a>
                        <p>{article.content}</p>
                    </div>
                ))}

                {/* <div className='flex flex-wrap justify-center'>
                    <div className='max-w-full flex-1 p-5 flex flex-col items-center'>
                        <Image src={placeholder} alt='Placeholder 1' className='w-1/2 min-w-36' />
                        <h3 className='max-w-full py-5 text-2xl text-red-600 font-bold'>HOW TO TRAIN FOR YOUR NEXT MARATHON</h3>
                        <p className='max-w-full text-red-600'>
                            Add an article, post or exciting update regarding your business.
                            Alternatively, share a professional tip to attract more readers.
                            Choose a great image, photo or video to feature in your post for extra engagement.
                        </p>
                    </div>
                    <div className='max-w-full flex-1 p-5 flex flex-col items-center'>
                        <Image src={placeholder} alt='Placeholder 2' className='w-1/2 min-w-36' />
                        <h3 className='max-w-full py-5 text-2xl text-red-600 font-bold'>BEACH BODY: FACTS VS MYTHS</h3>
                        <p className='max-w-full text-red-600'>
                            Add an article, post or exciting update regarding your business.
                            Alternatively, share a professional tip to attract more readers.
                            Choose a great image, photo or video to feature in your post for extra engagement.
                        </p>
                    </div>
                    <div className='max-w-full flex-1 p-5 flex flex-col items-center'>
                        <Image src={placeholder} alt='Placeholder 3' className='w-1/2 min-w-36' />
                        <h3 className='max-w-full py-5 text-2xl text-red-600 font-bold'>10 WAYS TO LOSE WEIGHT</h3>
                        <p className='max-w-full text-red-600'>
                            Add an article, post or exciting update regarding your business.
                            Alternatively, share a professional tip to attract more readers.
                            Choose a great image, photo or video to feature in your post for extra engagement.
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default async function TipsAndAdvicePage() {
    const articles = await scrapeWebsite("https://www.nzherald.co.nz/topic/fitness/2/");

    return (
        <InfoLayout content={TipsAndAdvice(articles)} />
    );
}