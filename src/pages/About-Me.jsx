import { useState, useEffect } from "react";
import Loading from "../utilities/Loading";
import BottomToTopAnimation from "../components/animation/BottomToTopAnimation";
import { Helmet } from "react-helmet";
const restBase = import.meta.env.VITE_URL;

const AboutMe = () => {
  const restPath = restBase + "pages/11";
  const [acfData, setAcfData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);
  const [yoastData, setYoastData] = useState(null);

  // Only trigger BottomToTopAnimation after isLoaded is true
  const { refs } = BottomToTopAnimation(isLoaded);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setYoastData(data.yoast_head_json);
        const yoastData = data.yoast_head_json;
        console.log("Yoast SEO Data:", yoastData);
        setAcfData(data.acf);
        setTimeout(() => setLoadStatus(true), 1500);
      }
    };
    fetchData();
  }, [restPath]);

  return (
    <>
     {yoastData && (
      <Helmet>
        <title>{yoastData.title}</title>
        <meta name="description" content={yoastData.description} />
        <link rel="canonical" href="https://hawhawtan.com/AboutMe"/>
        {/* Add Open Graph and Twitter meta tags as needed */}
      </Helmet>
      )}
      {isLoaded ? (
        <>
          <h1>About Me</h1>
          <section ref={(el) => (refs.current[0] = el)} id="about-me">
            {acfData.about_me && (
              <>
                {acfData.about_me.map((content, index) => (
                  <p key={index}>{content.paragraph}</p>
                ))}
              </>
            )}
          </section>
          <div id="interesting-content">
            <section
              ref={(el) => (refs.current[1] = el)}
              id="currently-working-on"
            >
              <h2>Currently Working On</h2>
              {acfData.currently_working_on && (
                <ul>
                  {acfData.currently_working_on.map((content, index) => (
                    <li key={index}>{content.working_on}</li>
                  ))}
                </ul>
              )}
            </section>
            <section ref={(el) => (refs.current[2] = el)} id="hobbies">
              <h2>Hobbies</h2>
              {acfData.hobbies && (
                <ul>
                  {acfData.hobbies.map((content, index) => (
                    <li key={index}>{content.what_i_enjoy}</li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AboutMe;
