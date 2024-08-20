'use client'

import { useRef, useEffect, useState } from 'react';

export const LandingVideo = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // IntersectionObserver helps us tell when a particular object comes on the screen
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setIsVisible(entry.isIntersecting);
        }, {
            threshold: 0.7 // only trigger when the video is 70% visible
        });

        if (videoRef.current) {
            observer.observe(videoRef.current);
        };

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        }
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            if (isVisible) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            };
        };
    }, [isVisible]);

    return (
        <div className='bg-gray-100 px-8 md:px-12 py-20'>
            <div className='max-w-3xl 2xl:max-w-4xl mx-auto w-full p-4 rounded-xl shadow-2xl'>
            <video
                ref={videoRef}
                src={'/landing.mp4'}
                className='aspect-video rounded-xl w-full'
                controls={false}
                loop={false}
                muted
                autoPlay
            />
            </div>
        </div>
    )
};