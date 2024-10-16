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
            <section id="work">
                <h1>Work</h1>
                    <div id='work-section'>
                    {restData.slice(0, numberOfProject).map(post => 
                        <article key={post.id} id={`${whichPage}`}>
                            {/* <img src={} alt="" /> */}
                            {post.featured_media !== 0 && post._embedded &&
                                <Link to={`/works/${post.slug}`}>
                                    <FeaturedImage 
                                    featuredImageObject={post._embedded['wp:featuredmedia'][0]} 
                                    size="medium" 
                                    />
                                </Link>
                            }
                            <Link to={`/works/${post.slug}`}><h2>{post.title.rendered}</h2></Link>
                            {whichPage == "work-page" && 
                            <div className="entry-content" dangerouslySetInnerHTML={{__html:post.excerpt.rendered}}></div>}
                            <Link to={`/works/${post.slug}`}><p id='more-details-button'>More Details</p></Link>
                        </article>
                    )}
                    </div>
            </section>
        </>
    )
}

export default Posts
