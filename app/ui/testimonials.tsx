'use client';

import { useEffect, useState, useRef } from 'react';
import { nestoCopper } from '@/app/ui/fonts';
import './ui.css';

export default function TestimonialDisplay() {
    const testimonials = [
        { 'text': 'This is your Testimonial quote. Use this space to share clients’ reviews about you, your services and exciting success stories. Get your site visitors excited to work with you!', 
            'author': 'Kris Michaels' }, 
        { 'text': 'This is your Testimonial quote. Use this space to share clients’ reviews about you, your services and exciting success stories. Get your site visitors excited to work with you!', 
            'author': 'Frankie Bolder' }, 
        { 'text': 'This is your Testimonial quote. Use this space to share clients’ reviews about you, your services and exciting success stories. Get your site visitors excited to work with you!', 
            'author': 'Robbie White' }
    ];
    const transitionTime = 10000;
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const testimonialBlocks = useRef<(HTMLDivElement | null)[]>([]);
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
            const timeout = setTimeout(() => {
                swap(1);
            }, transitionTime);
            return () => { clearTimeout(timeout); };
        }
    }, [testimonialIndex, swap]);

    return (
        <div className='relative py-32 flex justify-center items-center text-center overflow-x-hidden'>
            {testimonials.map((testimonial, index) => (
                <div key={`testimonial${index + 1}`} ref={(block) => { testimonialBlocks.current.push(block); }} onAnimationEnd={() => { setBlock(index); }} className={`px-72 ${(index == 0 ? 'block' : 'hidden') }`}>
                    <p className={`mt-5 text-9xl text-red-600 ${nestoCopper.className} leading-[0.5]`}>{'\'\''}</p>
                    <p className='text-red-600'>{testimonial.text}</p>
                    <p className='mt-10 text-xl text-red-600'>{testimonial.author}</p>
                </div>
            ))}
            <button ref={leftButton} onClick={() => { swap(-1); }} className='absolute top-1/2 left-16 translate-y-[-50%] text-5xl text-red-600 hover:text-red-400'>{`<`}</button>
            <button ref={rightButton} onClick={() => { swap(1); }} className='absolute top-1/2 right-16 translate-y-[-50%] text-5xl text-red-600 hover:text-red-400'>{`>`}</button>
        </div>
    );
}
