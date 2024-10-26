import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';

const BottomToTopAnimation = (isLoaded) => {
    const refs = useRef([]);

    useGSAP(() => {
        // Apply the GSAP animation to each section
        if(isLoaded){
             gsap.fromTo(
                refs.current,
                { y: '100%', opacity: 0 }, // Start position
                { y: '0%', opacity: 1, duration: 1.5, stagger: 0.3, ease: 'power3.out', 
                    scrollTrigger: {
                        trigger: refs.current,  // Trigger each individual article
                        start: 'top 100%',             
                        toggleActions: 'play none none none' 
                    }
                } // Animation properties
            );
        }
       
    }, [isLoaded]);

    return { refs };
};

export default BottomToTopAnimation;
