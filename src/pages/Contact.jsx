import React from 'react'
import { useState, useEffect } from 'react'
// import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'

function Contact() {
    const restPath = restBase + 'pages/18'
    const [acfData, setAcfData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false) // if i want to add the load 

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setLoadStatus(true)
                setAcfData(data.acf);
                console.log(data.acf);
                
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
  return (
    <footer>
        {/* help do i use p tag for the copyright */}
        <p id='copyright'>{acfData.copyright}</p> 
        <div className='social-media'>
            <a href={acfData.linkedin}>Linkedin</a>
            <a href={acfData.github}>Github</a>
            <a href={acfData.email}>Email</a>
        </div>
    </footer>
  )
}

export default Contact