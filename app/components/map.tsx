'use client';

import { useRef } from 'react';

export default function Map() {
    const overlay = useRef(null);

    return (
        <div className='relative w-3/4'>
            <div ref={overlay} onClick={() => { (overlay.current as unknown as HTMLDivElement).style.zIndex = '-1'; }} className='w-full aspect-video absolute bg-gray-100 opacity-15 flex justify-center items-center'>
                <h3 className='text-3xl font-semibold'>Click to Focus</h3>
            </div>
            <iframe onMouseLeave={() => { (overlay.current as unknown as HTMLDivElement).style.zIndex = 'auto'; }} src="https://www.google.com/maps/d/embed?mid=1MGoj-ojH26UAkE3XJi637a41FHjxSfc&ehbc=2E312F&noprof=1" className='w-full aspect-video object-cover' />
        </div>
    );
}
