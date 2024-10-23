import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import Posts from '../components/Posts'

const Works = ({whichPage = "work-page", numberOfProject = "5"}) => {
    const restPath = restBase + 'pages/11'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false) // if i want to add the load 

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
    
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
