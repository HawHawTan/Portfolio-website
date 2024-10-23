import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Posts from "../components/Posts";

import { gsap } from "gsap/dist/gsap";
import { useGSAP } from '@gsap/react';

const Home = () => {
  const restPath = restBase + "pages/9";
  const [restData, setData] = useState(null); // Use null initially

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(restPath);
        if (response.ok) {
          const data = await response.json();
          setData(data); // Set the data once fetched
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [restPath]);

  useEffect(() => {
    if (restData) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.fromTo(
        "#wave-text span",
        { y: 50, opacity: 0 },
        {
          y: 0,
          textShadow: " 5px 2px 0px  #c7deff50",
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        }
      ).to("#wave-text span", {
        // textShadow: " 5px 2px 0px  #c7deff50",
        y: 15,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.inOut",
        repeat: -1,
        yoyo: true,
      });
      // gsap.fromTo(
      //     "#wave-text span",
      //     { textShadow: "0px 0px 0px rgba(0, 0, 0, 0)" },
      //     {
      //         textShadow: " 7px 3px 0px  #c7deff",
      //         duration: 0.9,
      //         stagger: 0.1,
      //         ease: "power3.out",
      //         repeat: -1,
      //         yoyo: true,
      //     }
      // );
    }
  }, [restData]);
    useGSAP(() => {
        if (restData) {
            const tl = gsap.timeline({ repeat: -1, yoyo: true }); // Repeat infinitely, reverse on each loop

            tl.fromTo(
                "#wave-text span",
                { y: 50, opacity: 0 },  // Initial animation starting point
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,  // Letters appear one by one
                    ease: "power3.inOut", // Smooth appearance
                }
            ).to(
                "#wave-text span",
                {
                    y: 15,  // Subtle up and down movement for the wave
                    duration: 0.7,
                    stagger: 0.1,
                    textShadow: " -3px 0px 2px #c7deff",
                    ease: "power3.inOut", // Smooth easing
                    repeat: -1,  // Loop infinitely
                    yoyo: true,  // Reverse back to original position
                }
            );
            // gsap.fromTo(
            //     "#wave-text span",
            //     { textShadow: "0px 0px 0px rgba(0, 0, 0, 0)" },  // Start with no shadow
            //     {
            //         textShadow: " 3px 0px 2px #c7deff",  // Add blue shadow
            //         duration: 0.9,  // Slightly slower than the text animation
            //         stagger: 0.1,  // Add a bit more delay to the shadow
            //         ease: "power3.inOut",
            //         repeat: -1,
            //         yoyo: true,
            //     }
            // );
        }
    }, [restData]);

  const createWaveText = (text) =>
    text.split("").map((char, index) => (
      <span key={index} style={{ display: "inline-block", margin: "0 0.2rem" }}>
        {char}
      </span>
    ));
  return (
    <>
      {restData ? (
        <>
          <section id="title">
            <h1 id={`post-${restData.id}`}>
              <div id="wave-text">
                {createWaveText(restData.title.rendered)}
              </div>
            </h1>
          </section>
          <section id="home-page-work">
            <h2>Work</h2>
            <Posts whichPage="home-posts" numberOfProject="2" />
          </section>
        </>
      ) : (
        // need to add something here, maybe a loader of something
        // You can add a loader, message, or leave it empty
        <p>Loading...</p>
      )}
    </>
  );
};

export default Home;
