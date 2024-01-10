'use client';

import { useEffect, useRef, useState} from 'react'
import Image from 'next/image'
import outdoorFitness from '@/public/outdoor_fitness.png'
import fitnessArmband from '@/public/fitness_armband.png'
import fitnessVideo from '@/public/fitness_video.png'
import onlineFitnessClass from '@/public/online_fitness_class.png'
import outdoorWorkout from '@/public/outdoor_workout.png'
import danceClass from '@/public/dance_class.png'
import outdoorExercise from '@/public/outdoor_exercise.png'
import yogaClass from '@/public/yoga_class.png'
import workoutLesson from '@/public/workout_lesson.png'
import exercisingAtHome from '@/public/exercising_at_home.png'
import upwardFacingDog from '@/public/upward_facing_dog.png'
import womenRunning from '@/public/women_running.png'
import funAtYoga from '@/public/fun_at_yoga.png'
import fitnessGears from '@/public/fitness_gears.png'

export default function Gallery() {
    const gallery = useRef(null);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const [imageIndex, setImageIndex] = useState(1);

    function scroll(imageNumber: number) {
        const wrapper = gallery.current as unknown as HTMLElement;
        const previousImage = imageRefs.current[imageIndex] as HTMLElement;
        const currentImage = imageRefs.current[imageNumber] as HTMLElement;
        previousImage.classList.remove('unfaded');
        previousImage.offsetHeight;
        previousImage.classList.add('faded');
        currentImage.classList.remove('faded');
        currentImage.offsetHeight;
        currentImage.classList.add('unfaded');

        wrapper.scrollTo({ left: (imageNumber + 0.5) * currentImage.clientWidth - wrapper.clientWidth / 2});

        setImageIndex(imageNumber);

        currentImage.style.pointerEvents = 'none';
        const timeout = setTimeout(() => { currentImage.style.pointerEvents = 'auto'; }, 1000);
        return () => { clearTimeout(timeout); };
    }

    useEffect(() => {
        scroll(1);

        const interval = setInterval(() => {
            setImageIndex(prevIndex => {
                if (prevIndex < 14) {
                    scroll(prevIndex + 1);
                    return prevIndex + 1;
                } else {
                    scroll(1);
                    return 1;
                }
            });
        }, 10000);
        return () => { clearInterval(interval); };
    }, [gallery]);

    return (
        <div ref={gallery} className='flex overflow-x-auto no-scrollbar scroll-smooth cursor-pointer'>
            <Image ref={(img) => {imageRefs.current.push(img)}} onClick={() => { scroll(14); }} src={fitnessGears} alt='Fitness Gears' className='w-1/2 opacity-75' />
            <Image ref={(img) => { imageRefs.current.push(img) }} onClick={() => { scroll(1); }} src={outdoorFitness} alt='Outdoor Fitness' className='w-1/2 opacity-75' />
            <Image ref={(img) => { imageRefs.current.push(img) }} onClick={() => { scroll(2); }} src={fitnessArmband} alt='Fitness Armband' className='w-1/2 opacity-75' />
            <Image ref={(img) => { imageRefs.current.push(img) }} onClick={() => { scroll(3); }} src={fitnessVideo} alt='Fitness Video' className='w-1/2 opacity-75' />
            <Image ref={(img) => { imageRefs.current.push(img) }} onClick={() => { scroll(4); }} src={onlineFitnessClass} alt='Online Fitness Class' className='w-1/2 opacity-75' />
            <Image ref={(img) => { imageRefs.current.push(img) }} onClick={() => { scroll(5); }} src={outdoorWorkout} alt='Outdoor Workout' className='w-1/2 opacity-75' />
            <Image ref={(img) => { imageRefs.current.push(img) }} onClick={() => { scroll(6); }} src={danceClass} alt='Dance Class' className='w-1/2 opacity-75' />
            <Image ref={(img) => { imageRefs.current.push(img) }} onClick={() => { scroll(7); }} src={outdoorExercise} alt='Outdoor Exercise' className='w-1/2 opacity-75' />
            <Image ref={(img) => { imageRefs.current.push(img) }} onClick={() => { scroll(8); }} src={yogaClass} alt='Yoga Class' className='w-1/2 opacity-75' />
            <Image ref={(img) => { imageRefs.current.push(img) }} onClick={() => { scroll(9); }} src={workoutLesson} alt='Workout Lesson' className='w-1/2 opacity-75' />
            <Image ref={(img) => { imageRefs.current.push(img) }} onClick={() => { scroll(10); }} src={exercisingAtHome} alt='Exercising at Home' className='w-1/2 opacity-75' />
            <Image ref={(img) => { imageRefs.current.push(img) }} onClick={() => { scroll(11); }} src={upwardFacingDog} alt='Upward Facing Dog' className='w-1/2 opacity-75' />
            <Image ref={(img) => { imageRefs.current.push(img) }} onClick={() => { scroll(12); }} src={womenRunning} alt='Women Running' className='w-1/2 opacity-75' />
            <Image ref={(img) => { imageRefs.current.push(img) }} onClick={() => { scroll(13); }} src={funAtYoga} alt='Fun at Yoga' className='w-1/2 opacity-75' />
            <Image ref={(img) => { imageRefs.current.push(img) }} onClick={() => { scroll(14); }} src={fitnessGears} alt='Fitness Gears' className='w-1/2 opacity-75' />
            <Image ref={(img) => { imageRefs.current.push(img) }} onClick={() => { scroll(1); }} src={outdoorFitness} alt='Outdoor Fitness' className='w-1/2 opacity-75' />
        </div>
    )
}
