import React from 'react'
import { useState, useEffect } from 'react'
import { restBase } from '../utilities/Utilities'
import { useNavigate } from 'react-router-dom'
import FeaturedImage from '../utilities/FeaturedImage'

import GsapAnimation from './animation/GsapAnimation'; //made a hook for this

function UpNext({slug}) {
  //`${restBase}posts?_embed`
  const restPath = `${restBase}posts?_embed`;
  const [restData, setData] = useState([]);
  const [index, setIndex] = useState([]);
  const [nextProject, setNextProject] = useState(null);
 
  const { refs, clickThenMoveRight } = GsapAnimation(restData);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNextProject = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        const currentIndex = data.findIndex((post) => post.slug === slug);
        setIndex(currentIndex);
        setData(data)
        console.log('====================================');
        console.log("res" + data);
        console.log("restData" + restData);
        console.log('====================================');
        // Set the next project if it exists
        if ((currentIndex !== -1 && currentIndex !== 0) && currentIndex <= data.length - 1 ) {
            setNextProject(data[currentIndex - 1]);
        }
        else{
            setNextProject(data[data.length -1]);
        } 
      }
    };
    fetchNextProject();
  }, [slug]);

  const handleClick = (index, slug) => {
    clickThenMoveRight(index, () => navigate(`/works/${slug}`)); // Animate and it move right to the single page
};
  return (
    // <>
    //     {nextProject && (
    //         <section className="up-next">
    //             <Link to={`/works/${nextProject.slug}`}>
    //                 <div className="up-next-card">
    //                   <FeaturedImage featuredImageObject={nextProject._embedded['wp:featuredmedia'][0]} size="large" />
    //                   <h3>{nextProject.title.rendered}</h3>
    //                   <p>More Details</p>
    //                 </div>
    //             </Link>
    //         </section>
    //     )}
    // </> //home-posts
    <div className='home-posts-section'>
        {nextProject && (
          
            <article 
                className={'home-posts'} 
                ref={el => refs.current[index] = el}
                onClick={() => handleClick(index, nextProject.slug)} 
            >
            {console.log(nextProject[0])}
                {nextProject.featured_media !== 0 && nextProject._embedded && (
                    <FeaturedImage 
                        featuredImageObject={nextProject._embedded['wp:featuredmedia'][0]} 
                        size="large" 
                    />
                )}
                <div className={`home-posts-content`}> 
                    <h3>{nextProject.title.rendered}</h3>
                    <p id="more-details-button">More Details</p>
                </div>
            </article> 
        )}
    </div>
  )
}

export default UpNext