'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import outdoorFitness from '@/public/outdoor_fitness.png';
import fitnessArmband from '@/public/fitness_armband.png';
import fitnessVideo from '@/public/fitness_video.png';
import onlineFitnessClass from '@/public/online_fitness_class.png';
import outdoorWorkout from '@/public/outdoor_workout.png';
import danceClass from '@/public/dance_class.png';
import outdoorExercise from '@/public/outdoor_exercise.png';
import yogaClass from '@/public/yoga_class.png';
import workoutLesson from '@/public/workout_lesson.png';
import exercisingAtHome from '@/public/exercising_at_home.png';
import upwardFacingDog from '@/public/upward_facing_dog.png';
import womenRunning from '@/public/women_running.png';
import funAtYoga from '@/public/fun_at_yoga.png';
import fitnessGears from '@/public/fitness_gears.png';

export default function Gallery() {
    const images = [
        { 'src': outdoorFitness, 'alt': 'Fitness Gears' }, 
        { 'src': fitnessArmband, 'alt': 'Fitness Armband' },
        { 'src': fitnessVideo, 'alt': 'Fitness Video' },
        { 'src': onlineFitnessClass, 'alt': 'Online Fitness Class' },
        { 'src': outdoorWorkout, 'alt': 'Outdoor Workout' },
        { 'src': danceClass, 'alt': 'Dance Class' },
        { 'src': outdoorExercise, 'alt': 'Outdoor Exercise' },
        { 'src': yogaClass, 'alt': 'Yoga Class' },
        { 'src': workoutLesson, 'alt': 'Workout Lesson' },
        { 'src': exercisingAtHome, 'alt': 'Exercising at Home' },
        { 'src': upwardFacingDog, 'alt': 'Upward Facing Dog' },
        { 'src': womenRunning, 'alt': 'Women Running' },
        { 'src': funAtYoga, 'alt': 'Fun at Yoga' },
        { 'src': fitnessGears, 'alt': 'Fitness Gears' }, 
    ];
    const transitionTime = 10000;
    const gallery = useRef(null);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const timeout = useRef<any>(null);
    const [imageIndex, setImageIndex] = useState(0);
    
    function scroll(index: number) {
        if (imageIndex != index && gallery.current) {
            const wrapper = gallery.current as unknown as HTMLElement;
            const currentImage = imageRefs.current[index] as HTMLElement;
            const previousImage = imageRefs.current[imageIndex] as HTMLElement;

            previousImage.classList.remove('unfaded');
            previousImage.offsetHeight;
            previousImage.classList.add('faded');
            currentImage.classList.remove('faded');
            currentImage.offsetHeight;
            currentImage.classList.add('unfaded');
            currentImage.style.pointerEvents = 'none';

            wrapper.scrollTo({ left: (index + 1) * currentImage.clientWidth - wrapper.clientWidth / 2 });

            setImageIndex(index);
        }
    }

    useEffect(() => {
        if (!document.hidden) {
            if (imageIndex < images.length - 1) {
                timeout.current = setTimeout(() => { scroll(imageIndex + 1); }, transitionTime);
            } else {
                timeout.current = setTimeout(() => { scroll(0); }, transitionTime);
            }
        }
        return () => { clearTimeout(timeout.current); };
    });

    return (
        <div className='relative'>
            <div ref={gallery} className='flex overflow-x-auto no-scrollbar scroll-smooth cursor-pointer'>
                <Image onClick={() => { clearTimeout(timeout.current); scroll(images.length - 1); }} src={images[images.length - 1].src} alt={images[images.length - 1].alt} className='w-1/4 object-cover object-right opacity-75' />
                {images.map((image, index) => (
                    <Image key={`image${index}`} ref={(img) => { imageRefs.current.push(img) }} onClick={() => { clearTimeout(timeout.current); scroll(index); }} onAnimationEnd={() => { const block = imageRefs.current[index] as unknown as HTMLElement; block.style.pointerEvents = 'auto'; }} src={image.src} alt={image.alt} className={`w-1/2 ${index == 0 ? 'opacity-100' : 'opacity-75'}`} />
                ))}
                <Image onClick={() => { clearTimeout(timeout.current); scroll(0); }} src={images[0].src} alt={images[0].alt} className='w-1/4 object-cover object-left opacity-75' />
            </div>
            {/* <button onClick={() => { clearTimeout(timeout.current); if (imageIndex > 0) { scroll(imageIndex - 1); } else { scroll(images.length - 1); } }} className='absolute top-1/2 left-16 translate-y-[-50%] font-semibold text-7xl text-white hover:text-gray-200'>{`<`}</button>
            <button onClick={() => { clearTimeout(timeout.current); if (imageIndex < images.length - 1) { scroll(imageIndex + 1); } else { scroll(0); } }} className='absolute top-1/2 right-16 translate-y-[-50%] font-semibold text-7xl text-white hover:text-gray-200'>{`>`}</button> */}
        </div>
    );
}
