import { Route, Routes, Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
// templates
import Home from "./pages/Home";
import SinglePage from "./components/Single-page";
import Works from "./pages/Works";
import AboutMe from "./pages/About-Me";

import ScrollToTop from "./utilities/ScrollToTop";
import logo from "./assets/icon.png"
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
    <ScrollToTop/>
      <header id="masthead" className="site-header">
        <div className="site-branding"></div>
        <nav className="site-navigation">
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/Works">Works</NavLink></li>
            <li><NavLink to='/AboutMe'>About</NavLink></li>
           {/* <li><NavLink to='/contact'>Contact</NavLink></li> */}
          </ul>
        </nav>
      </header>
      <main style={{ backgroundPosition: `0% ${scrollY / 30}%` }}>
        <img src={logo} alt="Icon" id="top-left-icon" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Works" element={<Works />} />
          <Route path="/Works/:slug" element={<SinglePage />} />
           <Route path='/AboutMe' element={<AboutMe />} />
          {/*<Route path='/contact' element={<Contact />} /> */}
        </Routes>
      </main>
    </>
  );
}

export default App;
