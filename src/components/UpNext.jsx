import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedImage from "../utilities/FeaturedImage";
const restBase = import.meta.env.VITE_URL;

import GsapAnimation from "./animation/LeftToRightAnimation"; //made a hook for this

function UpNext({ slug }) {
  const restPath = `${restBase}posts?_embed`;
  const [restData, setData] = useState([]);
  const [index, setIndex] = useState(null);
  const [nextProject, setNextProject] = useState(null);

  const { refs, clickThenMoveRightOrLeft } = GsapAnimation(restData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNextProject = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        const currentIndex = data.findIndex((post) => post.slug === slug);
        setIndex(currentIndex);
        setData(data);
        // Set the next project based on the current index
        if (
          currentIndex !== -1 &&
          currentIndex !== 0 &&
          currentIndex <= data.length - 1
        ) {
          setNextProject(data[currentIndex - 1]);
        } else {
          setNextProject(data[data.length - 1]);
        }
      }
    };

    fetchNextProject();
  }, [slug, restPath]);

  const handleClick = (nextSlug) => {
    clickThenMoveRightOrLeft(index, () => {
      navigate(`/Projects/${nextSlug}`); // Navigate to the next project
    });
  };

  return (
    <div className="home-posts-section">
      {nextProject && (
        <article
          className={"home-posts"}
          ref={(el) => (refs.current[index] = el)}
          onClick={() => handleClick(nextProject.slug)}
        >
          {nextProject.featured_media !== 0 && nextProject._embedded && (
            <FeaturedImage
              featuredImageObject={nextProject._embedded["wp:featuredmedia"][0]}
              size="large"
            />
          )}
          <div className={`home-posts-content`}>
            <h3>{nextProject.title.rendered}</h3>
            <p id="button">More Details</p>
          </div>
        </article>
      )}
    </div>
  );
}

export default UpNext;
