import { Route, Routes, Link, NavLink } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import Home from './templates/Home'
import Post from './templates/Post'
import Posts from './templates/Posts'

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <header id="masthead" className="site-header">
        <div className="site-branding">
          {/* add my logo */}
        </div>
        <nav className="site-navigation">
          <ul>
            <li><NavLink to='/'end>Home</NavLink></li>
            <li><NavLink to='/works'>Works</NavLink></li>
            {/*<li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li> */}
          </ul>
        </nav>
      </header>
      <main style={{ backgroundPosition: `0% ${scrollY / 15}%` }} id="main">
        <Routes>
          <Route path='/' element={<Home />} />
         <Route path='/works' element={<Posts />} />
         <Route path='/works/:slug' element={<Post />} />
           {/* <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} /> */}
        </Routes>
      </main>
    </>
  )
}

export default App
