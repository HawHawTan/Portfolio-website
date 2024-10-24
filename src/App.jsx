import { Route, Routes, Link, NavLink } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
// templates
import Home from "./pages/Home";
import Works from "./pages/Works";
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
      {/* add a screen reader fix */}
      <Background />
      <ScrollToTop />
      {/* <SiteIcon/> */}
      <header id="masthead" className="site-header">
        <div className="site-branding"></div>
        <nav className="site-navigation">
          <ul>
            <li>
              <NavLink to="/" aria-label="Home" end> Home </NavLink>
            </li>
            <li>
              <NavLink to="/Works" aria-label="Works">Works </NavLink>
            </li>
            <li>
              <NavLink to="/AboutMe" aria-label="About Me">About</NavLink>
            </li>
            {/* <li><NavLink to='/contact'>Contact</NavLink></li> */}
          </ul>
        </nav>
      </header>
      {/* <main style={{ backgroundPosition: `0% ${scrollY / 30}%` }}> */}
      <main>
        {/* <img src={logo} alt="Icon" id="top-left-icon" /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Works" element={<Works />} />
          <Route path="/Works/:slug" element={<SinglePage />} />
          <Route path="/AboutMe" element={<AboutMe />} />
          {/*<Route path='/contact' element={<Contact />} /> */}
        </Routes>
      </main>
      <Footer/>
    </>
  );
}

export default App;
