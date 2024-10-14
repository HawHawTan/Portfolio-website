import React, { useEffect, useRef, useState } from "react";
import { restBase } from '../utilities/Utilities';

function ScrollReverseVideo() {
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null);

  // Fetch video data from WordPress
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(restBase + "media/");
        if (response.ok) {
          const data = await response.json();
          const videoData = data.find(media => media.mime_type === "video/mp4");
          if (videoData) {
            setVideoUrl(videoData.source_url);
          }
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, []);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;

      if (video) {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        // Calculate the scroll fraction
        const scrollFraction = Math.min(1, scrollTop / maxScroll);

        // If scrolled to the top, set the video to play from the beginning
        if (scrollTop === 0) {
          video.currentTime = 0; // Start video from the beginning
          video.play(); // Optionally, autoplay
        } else {
          // Set currentTime to reverse playback based on scroll
          video.currentTime = video.duration * (1 - scrollFraction);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{}}> {/* Increased height to allow scrolling */}
      {videoUrl ? (
        <video ref={videoRef} width="100%" height="auto" muted>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
      <p>Scroll to reverse the video playback!</p>
    </div>
  );
}

export default ScrollReverseVideo;
