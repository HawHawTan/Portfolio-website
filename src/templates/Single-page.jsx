import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
// import Loading from '../utilities/Loading'
import ProjectSummary from "../component/ProjectSummary"
import { restBase } from '../utilities/Utilities'
import FeaturedImage from '../utilities/FeaturedImage'

const SinglePage = () => {
    const { slug } = useParams();
    const restPath = restBase + `posts?slug=${slug}&_embed`
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const [acfData, setAcfData] = useState(null);
    const [nextProject, setNextProject] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data[0])
                setLoadStatus(true)
                setAcfData(data[0].acf);
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
    
    useEffect(() => {
        const fetchNextProject = async () => {
          const response = await fetch(restBase + `posts?_embed`);
          if (response.ok) {
            const allPosts = await response.json();
            const currentIndex = allPosts.findIndex((post) => post.slug === slug);
            // Set the next project if it exists
            if ((currentIndex !== -1 && currentIndex !== 0) && currentIndex <= allPosts.length - 1 ) {
                setNextProject(allPosts[currentIndex - 1]);
            }
            else{
                setNextProject(allPosts[allPosts.length -1]);

                console.log("it work");
                
            } 
          }
        };
        fetchNextProject();
      }, [slug]);
      console.log('====================================');
      console.log(nextProject);
      console.log('====================================');
    return (
        <>
        { isLoaded ?
            <>
                <section id={`post-${restData.id}`} className="single-page">
                    <h1>{restData.title.rendered}</h1>
                    {restData.featured_media !== 0 && restData._embedded &&
                        <FeaturedImage featuredImageObject={restData._embedded['wp:featuredmedia'][0]} />
                    }
                    <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}></div>
                </section>
                <section>
                    {acfData && (
                            <div>
                                <div>
                                    <ProjectSummary acfData={acfData} fieldKey="key_features" title="key Features"/>                            
                                    <ProjectSummary acfData={acfData} fieldKey="technical_stack" title="Technical Stack"/>                            
                                    <ProjectSummary acfData={acfData} fieldKey="challenges" title="Challenges"/>                            
                                 </div>
                            </div>
                        )}
                </section>
                {nextProject && (
                    <section className="up-next">
                        <h2>Up Next</h2>
                        <Link to={`/works/${nextProject.slug}`}>
                            <div className="up-next-card">
                            <h3>{nextProject.title.rendered}</h3>
                            <p>More Details ➔</p>
                            </div>
                        </Link>
                    </section>
                )}
            </>
        : 
           null
        }
        </>   
    )
}

export default SinglePage
