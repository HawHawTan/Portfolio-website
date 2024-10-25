import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { restBase } from "../utilities/Utilities";

import Loading from '../utilities/Loading';
import ProjectSummary from "./ProjectSummary";
import ProjectOverview from "./ProjectOverview";
import UpNext from "./UpNext";

const SinglePage = () => {
  const { slug } = useParams(); // Dynamically gets slug from URL
  const restPath = restBase + `posts?slug=${slug}&_embed&acf_format=standard`;

  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);
  const [acfData, setAcfData] = useState(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(false); // Reset the content display

    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data[0]);
        setAcfData(data[0].acf);
        setLoadStatus(true);

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
    {showContent ? (
      <>
      <section id={`post-${restData.id}`} className="single-page">
        <ProjectOverview acfData={acfData} />
      </section>
      <div id="projectSummary-div">
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
