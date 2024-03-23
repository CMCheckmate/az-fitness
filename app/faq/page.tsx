import Image from 'next/image';
import InfoLayout from '@/app/components/info-layout';
import outdoorExercise from '@/public/outdoor_exercise.png';
import yogaClass from '@/public/yoga_class.png';
import workoutLesson from '@/public/workout_lesson.png';

function FAQ() {
    return (
        <div className='flex justify-center items-center bg-gray-100'>
            <div className='md:w-3/4 min-w-min flex flex-col justify-center items-center p-16 text-center'>
                <h2 className='text-4xl text-red-600 font-bold'>FAQS</h2>
                <h3 className='p-5 text-2xl text-red-600'>Find the Answers</h3>
                <p className='mb-32 text-xl text-red-600'>
                    There are always a lot of questions when it comes to fitness.
                    Below, I have listed my answers to some of the most common ones I receive.
                    There are obviously a lot more questions, so feel free to get in touch through any of my listed contacts.
                </p>

                <Image src={outdoorExercise} alt='Outdoor Exercise' className='w-3/4 min-w-44' />
                <h2 className='m-10 text-2xl text-red-600 font-bold'>How are you different from a regular gym trainer?</h2>
                <p className='mb-32 text-xl text-red-600'>
                    I create personalised workout plans tailored to your individual goals and needs, leveraging my unique experiences, qualifications, and personal philosophy.
                    Beyond just workout plans, I will track and monitor your progress, offer dietary advice and guidance, teach you about fitness, and provide one-on-one training sessions that not only challenge you but also keep you motivated.
                    This comprehensive approach ensures you{'\''}re not just another member in a gym; you{'\''}re a priority, with every aspect of your fitness journey carefully managed and supported.
                </p>

                <Image src={yogaClass} alt='Yoga Class' className='w-3/4 min-w-44' />
                <h2 className='m-10 text-2xl text-red-600 font-bold'>What does a session with you look like?</h2>
                <p className='mb-32 text-xl text-red-600'>
                    I keep sessions dynamic and engaging by working out with you and demonstrating the proper techniques for exercises, motivating you, and listening to your needs, making adjustments where necessary.
                    We{'\''}ll start with a warm-up tailored to the day{'\''}s workout, followed by a series of exercises specifically chosen for your goals.
                    I believe that communication is key, so we{'\''}ll also have discussions about your fitness journey, adjustments in your routine, or any concerns you have, making sure you{'\''}re being heard every step of the way.
                </p>

                <Image src={workoutLesson} alt='Workout Lesson' className='w-3/4 min-w-44' />
                <h2 className='m-10 text-2xl text-red-600 font-bold'>Do you charge extra for nutritional guidance or diet planning?</h2>
                <p className='text-xl text-red-600'>
                    Nutritional guidance and diet planning are integrated into my services without extra charge because I believe in a holistic approach to fitness.
                    Nutrition is an absolutely crucial part of working out, as it underpins every aspect of your fitness journey, from energy levels to recovery.
                    My aim is to empower and teach you to become independent in managing your nutrition and all other areas of your fitness journey.
                    This means equipping you with the knowledge and skills to make diet plans, create effective workout programs, and exercise confidently all on your own.
                </p>
            </div>
        </div>
    );
}

export default function FAQPage() {
    return (
        <InfoLayout content={FAQ()} />
    );
}
