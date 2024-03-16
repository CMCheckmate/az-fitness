'use client';

import { useEffect, useState, useRef } from 'react';
import { nestoCopper } from '@/app/components/fonts';

export default function TestimonialDisplay() {
    const testimonials = [
        {
            'text': 'Aran was very accommodating and super passionate about his work. Whenever I needed adjustments made or I didn\'t feel like doing an exercise, he would swap it out or even change the whole program.', 
            'author': 'Jamie Bassett'
        }, 
        {
            'text': 'He treated me with a level of respect I didn\'t get from anyone else, even female gym trainers. He knew what he was doing and helped me achieve my goals and learn how to workout by myself.', 
            'author': 'Alyssa Merit'
        }, 
        {
            'text': 'When working with Aran you can expect effective programs and high-quality sessions. I saw brilliant results being with him for just a few months, and I still go to him for advice when I need it.', 
            'author': 'Logan Chalmers'
        },
        {
            'text': 'He made me feel really comfortable in a gym when I used to feel very shy and self-conscious. I am a lot more confident now working out in a gym setting by myself with other people.',
            'author': 'Jade Colson'
        },
        {
            'text': 'Aran is a very dedicated personal trainer and his sessions are of a high standard. He has great communication skills and provides good support and detailed explanations for all programs and exercises.',
            'author': 'Ming Ray Goy'
        }
    ];
    const transitionTime = 10000;
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const testimonialBlocks = useRef<(HTMLDivElement | null)[]>([]);
    const timeout = useRef<any>(null);
    const [leftButton, rightButton] = [useRef(null), useRef(null)];

    function swap(direction: number) {
        const leftAction = leftButton.current as unknown as HTMLElement;
        const rightAction = rightButton.current as unknown as HTMLElement;
        const currentIndex = (testimonialIndex == 0 && direction == -1) ? testimonials.length - 1 : (testimonialIndex == testimonials.length - 1 && direction == 1) ? 0 : testimonialIndex + direction;
        const previousTestimonial = testimonialBlocks.current[testimonialIndex] as HTMLElement;
        const currentTestimonial = testimonialBlocks.current[currentIndex] as HTMLElement;

        leftAction.style.pointerEvents = 'none';
        rightAction.style.pointerEvents = 'none';

        previousTestimonial.style.position = 'absolute';
        previousTestimonial.style.animation = 'none';
        previousTestimonial.offsetHeight;
        previousTestimonial.style.animation = 'slideLeft 1s ease';

        currentTestimonial.style.display = 'block';
        currentTestimonial.style.animation = 'none';
        currentTestimonial.offsetHeight;
        currentTestimonial.style.animation = 'slideRight 1s ease';

        if (direction == -1) {
            previousTestimonial.style.animation = 'slideRight 1s ease';
            currentTestimonial.style.animation = 'slideLeft 1s ease';
        }
        currentTestimonial.style.animationDirection = 'reverse';
        
        setTestimonialIndex(currentIndex);
    }

    function setBlock(index: number) {
        const leftAction = leftButton.current as unknown as HTMLElement;
        const rightAction = rightButton.current as unknown as HTMLElement;
        const block = testimonialBlocks.current[index] as unknown as HTMLElement;
        
        if (block.style.position == 'absolute') {
            block.style.position = 'static';
            block.style.display = 'none';
        }

        leftAction.style.pointerEvents = 'auto';
        rightAction.style.pointerEvents = 'auto';
    }

    useEffect(() => {
        if (!document.hidden) {
            timeout.current = setTimeout(() => { swap(1); }, transitionTime);
        }
        return () => { clearTimeout(timeout.current); };
    });

    return (
        <div className='relative py-32 flex justify-center items-center text-center overflow-x-hidden'>
            {testimonials.map((testimonial, index) => (
                <div key={`testimonial${index + 1}`} ref={(block) => { testimonialBlocks.current.push(block); }} onAnimationEnd={() => { setBlock(index); }} className={`w-3/4 min-w-min ${(index == 0 ? 'block' : 'hidden') }`}>
                    <p className={`mt-5 text-9xl text-red-600 ${nestoCopper.className} leading-[0.5]`}>{'\'\''}</p>
                    <p className='mx-16 text-red-600'>{testimonial.text}</p>
                    <p className='mt-10 text-xl text-red-600'>{testimonial.author}</p>
                </div>
            ))}
            <button ref={leftButton} onClick={() => { clearTimeout(timeout.current); swap(-1); }} className='absolute top-1/2 left-8 translate-y-[-50%] text-5xl text-red-600 hover:text-red-400'>{`<`}</button>
            <button ref={rightButton} onClick={() => { clearTimeout(timeout.current); swap(1); }} className='absolute top-1/2 right-8 translate-y-[-50%] text-5xl text-red-600 hover:text-red-400'>{`>`}</button>
        </div>
    );
}
