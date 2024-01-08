'use client';

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function ImageGallery() {
    const gallery = useRef(null);
    const [imageWidth, setImageWidth] = useState<number>(0);
    let currentImage = 1;

    function scroll() {
        if (gallery.current)
        {
            const wrapper = gallery.current as HTMLElement;
            const scrollAmount = wrapper.clientWidth / 2;
            const images = wrapper.querySelectorAll('img');

            images[currentImage].style.opacity = '0.75';
            if (currentImage == images.length || wrapper.scrollLeft == 0)
            {
                currentImage = 1;
                wrapper.scrollTo({ left: scrollAmount / 2 , behavior: 'smooth' });
            }
            else
            {
                currentImage += 1;
                wrapper.scrollTo({ left: wrapper.scrollLeft + scrollAmount, behavior: 'smooth' });
            }
            images[currentImage].style.opacity = '1';
        }
    }

    useEffect(() => {
        if (gallery.current)
        {
            const wrapper = gallery.current as HTMLElement;
            setImageWidth(wrapper.clientWidth / 2);
        }

        const interval = setInterval(scroll, 10000);
        return () => {
            clearInterval(interval);
        };
    });

    return (
        <div ref={gallery} className='py-5 flex flex-nowrap items-center overflow-x-auto no-scrollbar'>
            <Image src='/fitness_gears.png' alt='Gallery Start' className='opacity-75' width={imageWidth} height = {0} />
            <Image src='/outdoor_fitness.png' alt='Outdoor Running' width={imageWidth} height={0} />
            <Image src='/fitness_armband.png' alt='Fitness Armband' className='opacity-75' width={imageWidth} height={0} />
            <Image src='/fitness_video.png' alt='Fitness Video' className='opacity-75' width={imageWidth} height={0} />
            <Image src='/online_fitness_class.png' alt='Online Fitness Class' className='opacity-75' width={imageWidth} height={0} />
            <Image src='/outdoor_workout.png' alt='Outdoor Workout' className='opacity-75' width={imageWidth} height={0} />
            <Image src='/dance_class.png' alt='Dance Class' className='opacity-75' width={imageWidth} height={0} />
            <Image src='/outdoor_exercise.png' alt='Outdoor Exercise' className='opacity-75' width={imageWidth} height={0} />
            <Image src='/yoga_class.png' alt='Yoga Class'  width={imageWidth} height={0} />
            <Image src='/workout_lesson.png' alt='Workout Lesson'  width={imageWidth} height={0} />
            <Image src='/exercising_at_home.png' alt='Exercising at Home' className='opacity-75' width={imageWidth} height={0} />
            <Image src='/upward_facing_dog.png' alt='Upward Facing Dog'  width={imageWidth} height={0} />
            <Image src='/women_running.png' alt='Women Running' className='opacity-75' width={imageWidth} height={0} />
            <Image src='/fun_at_yoga.png' alt='Fun at Yoga' className='opacity-75' width={imageWidth} height={0} />
            <Image src='/fitness_gears.png' alt='Fitness Gears' className='opacity-75' width={imageWidth} height={0} />
            <Image src='/outdoor_fitness.png' alt='Gallery End' className='opacity-75' width={imageWidth} height={0} />
        </div>
    )
}
