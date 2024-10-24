import { useState, useEffect, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { restBase } from '../utilities/Utilities';
import FeaturedImage from '../utilities/FeaturedImage';

import GsapAnimation from './animation/GsapAnimation'; //made a hook for this


const Posts = ({ whichPage = "work-page", numberOfProject = "5" }) => {
    const restPath = `${restBase}posts?_embed`;
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const [acfData, setAcfData] = useState(null);

    const { refs, clickThenMoveRight } = GsapAnimation(restData);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(restPath);
                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                    setLoadStatus(true);
                } else {
                    setLoadStatus(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPath]);

    const handleClick = (index, slug) => {
        clickThenMoveRight(index, () => navigate(`/works/${slug}`)); // Animate and it move right to the single page
    };

    return (
        <div id="work">
            <div className={`${whichPage}-section`}>
                {isLoaded && (
                    restData.slice(0, numberOfProject).map((post, index) => (
                        <article 
                            key={post.id} 
                            className={`${whichPage}`} 
                            ref={el => refs.current[index] = el} // Store refs for each article
                            onClick={() => handleClick(index, post.slug)} 
                        >
                            {post.featured_media !== 0 && post._embedded && (
                                <FeaturedImage 
                                    featuredImageObject={post._embedded['wp:featuredmedia'][0]} 
                                    size="large" 
                                />
                            )}
                            <div className={`${whichPage}-content`}> 
                                <h3>{post.title.rendered}</h3>
                                {whichPage === "work-page" && (
                                    <div className="entry-content" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                                )}
                                <p id="more-details-button">More Details</p>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
};

export default Posts;
