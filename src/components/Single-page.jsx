import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import Loading from '../utilities/Loading'
import { restBase } from "../utilities/Utilities";

// loading components
import ProjectSummary from "./ProjectSummary";
import ProjectOverview from "./ProjectOverview";
import UpNext from "./UpNext";

const SinglePage = () => {
  const { slug } = useParams();
  const restPath = restBase + `posts?slug=${slug}&_embed&acf_format=standard`;
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);
  const [acfData, setAcfData] = useState(null);
  const [nextProject, setNextProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data[0]);
        setLoadStatus(true);
        setAcfData(data[0].acf);
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);

  return (
    <>
  
        <>
          <section id={`post-${restData.id}`} className="single-page">
            {/* {restData.featured_media !== 0 && restData._embedded &&
                        <FeaturedImage featuredImageObject={restData._embedded['wp:featuredmedia'][0]} />
                    } */}
            {/* <ScrollReverseVide/>   */}
            {/* if i want reload the video when i am back to the top*/}
            {/* <div
              className="entry-content"
              dangerouslySetInnerHTML={{ __html: restData.content.rendered }}
            ></div> */}
            <ProjectOverview acfData={acfData} />
          </section>
          <div id="projectSummary-div">
            {acfData && (
              <>
                <ProjectSummary
                  acfData={acfData}
                  fieldKey="key_features"
                  title="key Features"
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
      
    </>
  );
};

export default SinglePage;
