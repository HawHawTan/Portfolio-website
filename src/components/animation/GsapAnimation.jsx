import { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function ClickThenMoveRight(restData) {
    const refs = useRef([]);

    // Animate LeftToRight animation
    useGSAP(() => {
        if (restData.length > 0) {
            gsap.fromTo(
                refs.current,
                { x: '-100%', opacity: 0 }, // Start position
                { x: '0%', opacity: 1, duration: 1.5, stagger: 0.3, ease: 'power3.out', 
                    scrollTrigger: {
                        trigger: refs.current,  // Trigger each individual article
                        start: 'top 80%',             
                        toggleActions: 'play none none none' 
                    }
                } // Animation properties
            );
        }
    }, [restData]);

    // Animation on click and then navigate
    const clickThenMoveRight = (index, navigate) => {
        const card = refs.current[index];
        console.log(card);
        
        if (card) {
            if(index%2 == 0){
                gsap.to(card, {
                    x: '-100vw', // Animate the card off-screen to the right
                    duration: 1, // Animation duration
                    ease: 'power3.in',
                    onComplete: () => {
                        navigate(); // Navigate after the animation completes
                    }
                });

            }
            else{
                gsap.to(card, {
                    x: '100vw', // Animate the card off-screen to the right
                    duration: 1, // Animation duration
                    ease: 'power3.in',
                    onComplete: () => {
                        navigate(); // Navigate after the animation completes
                    }
                });

            }
        }
    };

    return { refs, clickThenMoveRight };
}

export default ClickThenMoveRight;
