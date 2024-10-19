import { useState, useEffect, useRef } from 'react';

import { gsap } from "gsap/dist/gsap";  
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LeftToRight(restData) {
    const sectionRefs = useRef([]); 

    useEffect(() => {
        if (restData.length > 0) {
            gsap.fromTo( sectionRefs.current, 
                { x: '-100%', opacity: 0 }, // Start position
                { 
                    x: '0%', 
                    opacity: 1, 
                    duration: 1.5,
                    stagger: 0.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRefs.current,  // Trigger each individual article
                        start: 'top 80%',             
                        toggleActions: 'play none none none' 
                    }
                }
            );
        }
    }, [restData]);
  return {sectionRefs}
}
export default LeftToRight