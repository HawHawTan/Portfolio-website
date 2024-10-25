import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import Posts from '../components/Posts'

const Works = () => {   
    return (
        <>
            <section id="Works">
                <h1>Works</h1>
                <Posts />   
            </section>
        </>
    )
}

export default Works
