import { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LeftToRight(restData) {
    const leftToRightRefs = useRef([]); // Store refs to each section

    useEffect(() => {
        if (restData.length > 0) {
            leftToRightRefs.current.forEach((ref, index) => {
                if (ref) {
                    gsap.fromTo(
                        ref, 
                        { x: '-100%', opacity: 0 }, // Start position
                        { 
                            x: '0%', 
                            opacity: 1, 
                            duration: 1.5,
                            stagger: 0.3,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: ref,  // Trigger each individual article
                                start: 'top 80%',
                                toggleActions: 'play none none none'
                            }
                        }
                    );
                }
            });
        }
    }, [restData]);

    return {leftToRightRefs }; // Return refs so they can be used
}

export default LeftToRight;
