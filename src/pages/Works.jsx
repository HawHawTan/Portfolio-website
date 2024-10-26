import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import Posts from '../components/Posts'

const Works = () => {   
    const [isLoaded, setLoadStatus] = useState(false);
    setTimeout(() => {
    setLoadStatus(true);
    }, 1500);
    return (
        <>
        {isLoaded ?(
            <section id="Works">
                <h1>Works</h1>
                <Posts />   
            </section>

        ):(
            <Loading/>
        )}
        </>
    )
}

export default Works
