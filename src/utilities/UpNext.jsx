import React from 'react'
import { useState, useEffect } from 'react'
import { restBase } from '../utilities/Utilities'
import { Link } from 'react-router-dom'
function UpNext({slug}) {
 const [nextProject, setNextProject] = useState(null);
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
        } 
      }
    };
    fetchNextProject();
  }, [slug]);
  return (
    <>
        {nextProject && (
            <section className="up-next">
                <Link to={`/works/${nextProject.slug}`}>
                    <div className="up-next-card">
                    <h3>{nextProject.title.rendered}</h3>
                    <p>More Details ➔</p>
                    </div>
                </Link>
            </section>
        )}
    </>
  )
}

export default UpNext