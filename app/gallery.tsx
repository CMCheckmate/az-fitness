'use client';

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Gallery() {
    const gallery = useRef(null);
    let imageIndex = 1;

    function scroll() {
        if (gallery.current) {
            const wrapper = gallery.current as HTMLElement;
            const images = wrapper.querySelectorAll('img');
            
            images[imageIndex].style.animation = 'none';
            images[imageIndex].offsetHeight;
            images[imageIndex].style.animation = 'fade 0.5s cubic-bezier(0.4, 0, 0.6, 1)';
            images[imageIndex].style.opacity = '0.75';

            const scrollAmount = wrapper.clientWidth / 2;
            if (wrapper.scrollLeft + scrollAmount < wrapper.scrollWidth - wrapper.clientWidth) {
                imageIndex += 1;
            } 
            else {
                imageIndex = 1;
            }

            images[imageIndex].style.animation = 'none';
            images[imageIndex].offsetHeight;
            images[imageIndex].style.animation = 'fade 1s cubic-bezier(0.4, 0, 0.6, 1)';
            images[imageIndex].style.animationDirection = 'reverse';
            images[imageIndex].style.opacity = '1';

            wrapper.scrollTo({ left: (imageIndex - 1) * scrollAmount, behavior: 'smooth' });
        }
    }

    useEffect(() => {
        const interval = setInterval(scroll, 10000);
        return () => { clearInterval(interval); };
    });

    return (
        <div ref={gallery} onClick={scroll} className='flex overflow-x-auto no-scrollbar cursor-pointer animate-[fade]'>
            <Image src='/fitness_gears.png' alt='Fitness Gears' className='translate-x-[-50%] min-w-[50%] min-h-full opacity-75' layout='responsive' width={0} height={0} />
            <Image src='/outdoor_fitness.png' alt='Outdoor Fitness' className='translate-x-[-50%] min-w-[50%] min-h-full' layout='responsive' width={0} height={0} />
            <Image src='/fitness_armband.png' alt='Fitness Armband' className='translate-x-[-50%] min-w-[50%] min-h-full opacity-75' layout='responsive' width={0} height={0} />
            <Image src='/fitness_video.png' alt='Fitness Video' className='translate-x-[-50%] min-w-[50%] min-h-full opacity-75' layout='responsive' width={0} height={0} />
            <Image src='/online_fitness_class.png' alt='Online Fitness Class' className='translate-x-[-50%] min-w-[50%] min-h-full opacity-75' layout='responsive' width={0} height={0} />
            <Image src='/outdoor_workout.png' alt='Outdoor Workout' className='translate-x-[-50%] min-w-[50%] min-h-full opacity-75' layout='responsive' width={0} height={0} />
            <Image src='/dance_class.png' alt='Dance Class' className='translate-x-[-50%] min-w-[50%] min-h-full opacity-75' layout='responsive' width={0} height={0} />
            <Image src='/outdoor_exercise.png' alt='Outdoor Exercise' className='translate-x-[-50%] min-w-[50%] min-h-full opacity-75' layout='responsive' width={0} height={0} />
            <Image src='/yoga_class.png' alt='Yoga Class' className='translate-x-[-50%] min-w-[50%] min-h-full opacity-75' layout='responsive' width={0} height={0} />
            <Image src='/workout_lesson.png' alt='Workout Lesson' className='translate-x-[-50%] min-w-[50%] min-h-full opacity-75' layout='responsive' width={0} height={0} />
            <Image src='/exercising_at_home.png' alt='Exercising at Home' className='translate-x-[-50%] min-w-[50%] min-h-full opacity-75' layout='responsive' width={0} height={0} />
            <Image src='/upward_facing_dog.png' alt='Upward Facing Dog' className='translate-x-[-50%] min-w-[50%] min-h-full opacity-75' layout='responsive' width={0} height={0} />
            <Image src='/women_running.png' alt='Women Running' className='translate-x-[-50%] min-w-[50%] min-h-full opacity-75' layout='responsive' width={0} height={0} />
            <Image src='/fun_at_yoga.png' alt='Fun at Yoga' className='translate-x-[-50%] min-w-[50%] min-h-full opacity-75' layout='responsive' width={0} height={0} />
            <Image src='/fitness_gears.png' alt='Fitness Gears' className='translate-x-[-50%] min-w-[50%] min-h-full opacity-75' layout='responsive' width={0} height={0} />
            <Image src='/outdoor_fitness.png' alt='Outdoor Fitness' className='translate-x-[-50%] min-w-[50%] min-h-full opacity-75' layout='responsive' width={0} height={0} />
        </div>
    )
}