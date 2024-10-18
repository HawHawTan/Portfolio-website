import React, { useEffect, useState } from "react";
import { restBase } from '../utilities/Utilities'

const SiteIcon = () => {
  const [siteIconUrl, setSiteIconUrl] = useState("");

  useEffect(() => {

    const fetchSiteIcon = async () => {
      try {
        const response = await fetch(restBase +"settings");
        const data = await response.json();
        if (data && data.site_icon_url) {
          setSiteIconUrl(data.site_icon_url);
        }
        console.log(response);
        
      } catch (error) {
        console.error("Error fetching site icon:", error);
      }
    };

    fetchSiteIcon();
  }, []);

  // If no site icon is found, display nothing
  if (!siteIconUrl) return null;

  // Dynamically set the favicon in the document head
  return (
    <link
      rel="icon"
      href={siteIconUrl}
      type="image/x-icon"
    />
  );
};

export default SiteIcon;
