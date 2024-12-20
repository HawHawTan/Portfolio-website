import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../utilities/Loading'
import Posts from '../components/Posts'

const Projects = () => {   
    const [isLoaded, setLoadStatus] = useState(false);
    setTimeout(() => {
    setLoadStatus(true);
    }, 1500);
    return (
        <>
        {isLoaded ?(
            <section id="main-content">
                <h1>Projects</h1>
                <Posts />   
            </section>

        ):(
            <Loading/>
        )}
        </>
    )
}

export default Projects
