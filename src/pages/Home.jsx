import { useState, useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from '@gsap/react';
import { Helmet } from "react-helmet";

const restBase = import.meta.env.VITE_URL;

import Posts from "../components/Posts";
import ScrollDown from "../utilities/ScrollDown";

const Home = () => {
  const restPath = restBase + "pages/9";
  const [restData, setData] = useState(null); // Use null initially
  const [yoastData, setYoastData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(restPath);
        if (response.ok) {
          const data = await response.json();
          setYoastData(data.yoast_head_json);
          setData(data); 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [restPath]);

  useGSAP(() => {
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
        y: 15,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, [restData]);

  const createWaveText = (text) =>
    text.split("").map((char, index) => (
      <span key={index}>
        {char}
      </span>
    ));
  return (
    <>
      {yoastData && (
        <Helmet>
          <title>{yoastData.title}</title>
          <meta name="description" content={yoastData.description} />
          <link rel="canonical" href="https://hawhawtan.com/"/>
        </Helmet>
      )}
      {restData &&(
        <>
          <section id="title">
            <h1 id={`post-${restData.id}`}>
              <div id="wave-text">
                {createWaveText(restData.title.rendered)}
              </div>
            </h1>
            <p>{restData.acf.specializes_title}</p>
            <ScrollDown aria-label="Scroll down to explore more content"/>
            </section>
          <section id ="main-content" className="home-page-work" >
            <h2>Feature Projects</h2>
            <Posts whichPage="home-posts" numberOfProject="2" />
          </section>
        </>
      )}
    </>
  );
};

export default Home;
