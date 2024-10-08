import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
// import FeaturedImage from '../utilities/FeaturedImage'

const Posts = ({where = "work-posts"}) => {
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
    
    return (
        <>
            <h1>Work</h1>
            {restData.map(post => 
                <article key={post.id} id={`${where}`}>
                    {post.featured_media !== 0 && post._embedded &&
                        <FeaturedImage featuredImageObject={post._embedded['wp:featuredmedia'][0]} />
                    }
                    <Link to={`/works/${post.slug}`}><h2>{post.title.rendered}</h2></Link>
                    <div className="entry-content" dangerouslySetInnerHTML={{__html:post.excerpt.rendered}}></div>
                </article>
            )}
        </>
    )
}

export default Posts
