'use client';

import { useRef } from 'react';

export const gymLocations = [
    '252 Oteha Valley Road, Albany', 
    'The Foundation 270 Oteha Valley Road, Albany',
    'Lower Ground B, 5/7 Corinthian Drive, Albany',
    'C3/65 Greville Road, Pinehill', 
    'Unit 5/18 Corinthian Drive, Albany',
    '1 University Ave Gate 1 - Massey University - East Precinct, Albany Expressway, Albany',
    '24 Tawa Drive, Albany', 
    '2 Rothwell Avenue, Albany', 
    'Level 1/28/44 William Pickering Drive, Rosedale', 
    '9c Holder Place, Albany', 
    '80 Wyndham Street, Auckland CBD', 
    '239 Queen Street, Auckland CBD', 
    'suite a/4 Arrenway Drive, Albany', 
    '42 Hobson Street, Auckland CBD', 
    '186 Victoria Street West, Auckland CBD', 
    'Level 6/10 - 14 Lorne Street, Auckland CBD', 
    'AUT City Campus, WB, Building Level 1/55 Wellesley Street East, Auckland CBD', 
    '184 Karangahape Road, Eden Terrace', 
    '4 South Street, Auckland CBD', 
    '149 Greys Avenue, Auckland CBD', 
];

export default function Map() {
    const overlay = useRef(null);

    return (
        <div className='w-full h-full relative'>
            <div ref={overlay} onClick={() => { (overlay.current as unknown as HTMLDivElement).style.zIndex = '-1'; }} className='w-full min-h-full absolute bg-gray-300 opacity-15 flex justify-center items-center z-[-1] md:z-auto'>
                <h3 className='text-3xl font-semibold'>Click to Focus</h3>
            </div>
            <iframe onMouseLeave={() => { (overlay.current as unknown as HTMLDivElement).style.zIndex = 'auto'; }} src="https://www.google.com/maps/d/embed?mid=1MGoj-ojH26UAkE3XJi637a41FHjxSfc&ehbc=2E312F&noprof=1" className='w-full min-h-full object-cover border-2' />
        </div>
    );
}
