import { useState, useEffect } from 'react'
import { restBase } from '../utilities/Utilities'
import Posts from './Posts'

const Home = () => {
    const restPath = restBase + 'pages/9'
    const [restData, setData] = useState(null)  // Use null initially

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(restPath)
                if (response.ok) {
                    const data = await response.json()
                    setData(data)  // Set the data once fetched
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [restPath])
    
    return (
        <>
            { restData ? (  
            <>
                <section id='title'>
                    <h1 id={`post-${restData.id}`}>{restData.title.rendered}</h1>
                </section>
                <section id='home-page-work'>
                    <Posts/>
                </section>
            </>
            ) : (
                // need to add something here, maybe a loader of something
                // You can add a loader, message, or leave it empty
                <p>Loading...</p>  
            )}
        </>
    )
}

export default Home
