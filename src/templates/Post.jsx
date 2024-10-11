import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
// import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import FeaturedImage from '../utilities/FeaturedImage'

const Post = () => {
    const { slug } = useParams();
    const restPath = restBase + `posts?slug=${slug}&_embed`
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const [acfData, setAcfData] = useState(null);

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
    console.log(acfData);
    
    return (
        <>
        { isLoaded ?
            <>
                <article id={`post-${restData.id}`} className="single-page">
                    <h1>{restData.title.rendered}</h1>
                    {restData.featured_media !== 0 && restData._embedded &&
                        <FeaturedImage featuredImageObject={restData._embedded['wp:featuredmedia'][0]} />
                    }
                    <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}></div>
                    {acfData && (
                        <div>
                            <h3>Key Features:</h3>
                            <ul>
                                {acfData.key_features.map((feature,index) =>
                                    <li key={index}> 
                                        <strong>{feature.title}: </strong>
                                        <br />{feature.description}
                                        <div className='blue-border'></div>
                                    </li>

                                )}
                            </ul>
                           
                        </div>
                    )}
                </article>
            </>
        : 
           null
        }
        </>   
    )
}

export default Post
