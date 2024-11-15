import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const restBase = import.meta.env.VITE_URL;

import Loading from '../utilities/Loading';
import ProjectSummary from "./ProjectSummary";
import ProjectOverview from "./ProjectOverview";
import UpNext from "./UpNext";
import { Helmet } from "react-helmet";

const SinglePage = () => {
  const { slug } = useParams(); // Dynamically gets slug from URL
  const restPath = restBase + `posts?slug=${slug}&_embed&acf_format=standard`;

  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);
  const [acfData, setAcfData] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [yoastData, setYoastData] = useState(null);
  const [featureImg, setFeatureImg] = useState(null);

  useEffect(() => {
    setShowContent(false); // Reset the content display

    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data[0]);
        setAcfData(data[0].acf);
        setLoadStatus(true);
        setYoastData(data[0]?.yoast_head_json);
        setFeatureImg(data[0].acf.image.filename);
      
        console.log('====================================');
        console.log(data[0]);
        console.log('====================================');
        setTimeout(() => {
          setShowContent(true);
        }, 1500);
      } else {
        setLoadStatus(false);
      }
    };

    fetchData();
  }, [restPath, slug]);


  return (
   <>
     {yoastData && (
      <Helmet>
        <title>{yoastData.title}</title>
        <meta name="description" content={yoastData.description} />
        <meta property="og:image" content={featureImg} />
        <link rel="canonical" href={`https://hawhawtan.com/Projects/${restData.slug}`} />
        {/* Add Open Graph and Twitter meta tags as needed */}
      </Helmet>
    )}
    {showContent ? (
      <>
      <section id={`post-${restData.id}`} className="single-page">
        <ProjectOverview acfData={acfData} />
      </section>
      <div id="projectSummary-div" aria-labelledby="project Summary">
        {acfData && (
          <>
            <ProjectSummary
              acfData={acfData}
              fieldKey="key_features"
              title="Key Features"
            />
            <ProjectSummary
              acfData={acfData}
              fieldKey="technical_stack"
              title="Technical Stack"
            />
            <ProjectSummary
              acfData={acfData}
              fieldKey="challenges"
              title="Challenges"
            />
          </>
        )}
      </div>
      <h2 id="up-next-title">Up Next</h2>
      <UpNext slug={slug} /> 
    </>
     ):(
      <Loading/>
    )}
    </> 
  )};

export default SinglePage;
