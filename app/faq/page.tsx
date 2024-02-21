import Image from 'next/image';
import InfoLayout from '@/app/components/info-layout';
import outdoorExercise from '@/public/outdoor_exercise.png';
import yogaClass from '@/public/yoga_class.png';
import workoutLesson from '@/public/workout_lesson.png';

function FAQ() {
    return (
        <div className='flex flex-col justify-center items-center p-40 text-center bg-gray-100'>
            <h2 className='text-4xl text-red-600 font-bold'>FAQS</h2>
            <h3 className='p-5 text-red-600'>Find the Answers</h3>
            <p className='mb-32 text-red-600'>There are always a lot of questions when it comes to fitness. 
                Below are answers to some of the most common questions I’ve received. 
                There are obviously a lot more questions, so feel free to get in touch through the contact page and ask away.
            </p>
                
            <Image src={outdoorExercise} alt='Outdoor Exercise' className='w-full' />

            <h2 className='m-10 text-2xl text-red-600 font-bold'>WHAT TYPES OF HOME FITNESS EQUIPMENT DO YOU RECOMMEND?</h2>
            <p className='mb-32 text-red-600'>Enter your answer here. Be thoughtful, write clearly and concisely, and consider adding written as well as visual examples. 
                Go over what you’ve written to make sure that if it was the first time you were visiting the site, you’d understand your answer.
            </p>

            <Image src={yogaClass} alt='Yoga Class' className='w-full' />

            <h2 className='m-10 text-2xl text-red-600 font-bold'>HOW ARE YOU DIFFERENT FROM A REGULAR GYM TRAINER?</h2>
            <p className='mb-32 text-red-600'>Enter your answer here. Be thoughtful, write clearly and concisely, and consider adding written as well as visual examples. 
                Go over what you’ve written to make sure that if it was the first time you were visiting the site, you’d understand your answer.
            </p>

            <Image src={workoutLesson} alt='Workout Lesson' className='w-full' />

            <h2 className='m-10 text-2xl text-red-600 font-bold'>DO YOU CHARGE EXTRA FOR NUTRITIONAL GUIDANCE AND A DIET PLAN?</h2>
            <p className='text-red-600'>Enter your answer here. Be thoughtful, write clearly and concisely, and consider adding written as well as visual examples. 
                Go over what you’ve written to make sure that if it was the first time you were visiting the site, you’d understand your answer.</p>
        </div>
    );
}

export default function FAQPage() {
    return (
        <InfoLayout content={FAQ()} />
    );
}
