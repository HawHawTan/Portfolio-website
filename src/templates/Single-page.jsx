import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
// import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import FeaturedImage from '../utilities/FeaturedImage'

// loading components
import ProjectSummary from "../components/ProjectSummary"
import UpNext from "../components/UpNext"

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
                console.log('====================================');
                console.log(data);
                console.log('====================================');
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    return (
        <>
        { isLoaded ?
            <>
                <section id={`post-${restData.id}`} className="single-page">
                    <h1>{restData.title.rendered}</h1>
                    {/* {restData.featured_media !== 0 && restData._embedded &&
                        <FeaturedImage featuredImageObject={restData._embedded['wp:featuredmedia'][0]} />
                    } */}
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
                <h2 id="up-next-title">Up Next</h2>
                <UpNext slug={slug}/>
            </>
        : 
           null
        }
        </>   
    )
}

export default SinglePage
