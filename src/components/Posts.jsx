import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import FeaturedImage from '../utilities/FeaturedImage'

const Posts = ({whichPage = "work-page", numberOfProject = "5"}) => {
    const restPath = restBase + 'posts?_embed'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false) // if i want to add the load 

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
    console.log(restData[0]);
    
    return (
        <>
            <div id="work">
                    <div className={`${whichPage}-section`}>
                    {restData.slice(0, numberOfProject).map(post => 
                        <article key={post.id} className={`${whichPage}`}>
                            {/* <img src={} alt="" /> */}
                            {post.featured_media !== 0 && post._embedded &&
                                <Link to={`/works/${post.slug}`}>
                                    <FeaturedImage 
                                    featuredImageObject={post._embedded['wp:featuredmedia'][0]} 
                                    size="medium" 
                                    />
                                </Link>
                            }
                            <div className={`${whichPage}-content`}> 
                                <Link to={`/works/${post.slug}`}><h3>{post.title.rendered}</h3></Link>
                                {whichPage == "work-page" && 
                                <div className="entry-content" dangerouslySetInnerHTML={{__html:post.excerpt.rendered}}></div>}
                                <Link to={`/works/${post.slug}`}><p id='more-details-button'>More Details</p></Link>
                            </div>
                        </article>
                    )}
                    </div>
            </div>
        </>
    )
}

export default Posts
