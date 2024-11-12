import React from "react";
import { useState, useEffect } from "react";
// import Loading from '../utilities/Loading'
import { restBase } from "../utilities/Utilities";

// icon
import Email from "../assets/svg/email.svg?react";
import Github from "../assets/svg/github.svg?react";
import Linkedin from "../assets/svg/Linkedin.svg?react";

function Contact() {
  const restPath = restBase + "pages/18";
  const [acfData, setAcfData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setAcfData(data.acf);
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);
  return (
    <footer >
      {/* <p id="copyright">{acfData.copyright}</p> */}
      <div className="social-media">
        <a href={acfData.linkedin} aria-label="LinkedIn Profile"><Linkedin /></a>
        <a href={acfData.github} aria-label="Github Profile"><Github/></a>
        <a href={`mailto:${acfData.email}`} aria-label="Email Profile" ><Email/></a> 
      </div>
    </footer>
  );
}

export default Contact;
