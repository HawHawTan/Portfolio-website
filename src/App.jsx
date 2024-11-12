import { Route, Routes, Link, NavLink } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import {Helmet} from "react-helmet";

// templates
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import AboutMe from "./pages/About-Me";
import Footer from "./pages/Footer";
 
import SinglePage from "./components/Single-page";
 
import Background from "./utilities/3DBackground";
import ScrollToTop from "./utilities/ScrollToTop";
// import SiteIcon from "./utilities/SiteIcon";
function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Background />
      {/* <ScrollToTop /> */}
      <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
      <header id="masthead" className="site-header">
        <nav className="site-navigation" role="navigation">
          <ul>
            <li><NavLink to="/" aria-label="Home" end> Home </NavLink></li>
            <li><NavLink to="/Projects" aria-label="Projects">Projects </NavLink></li>
            <li><NavLink to="/AboutMe" aria-label="About Me">About Me</NavLink></li>
          </ul>
        </nav>
      </header>
      {/* <main style={{ backgroundPosition: `0% ${scrollY / 30}%` }}> */}
      <main>
     

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Projects/:slug" element={<SinglePage />} />
          <Route path="/AboutMe" element={<AboutMe />} />
          <Route path="*" element={<Home />} /> {/*need to make a 404 page*/}
        </Routes>
      </main>
      <Footer/>
    </>
  );
}

export default App;
