import { useState, useEffect } from 'react'
// import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'


const AboutMe = () => {
    const restPath = restBase + 'pages/11'
    const [restData, setData] = useState([])
    const [acfData, setAcfData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false) // if i want to add the load 

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setLoadStatus(true)
                setAcfData(data.acf);
                // console.log(data.acf);
                
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
    
    return (
        <>
            <h1>About Me</h1>
            <section id="about-me">
                {acfData.about_me && (
                    <>
                        {acfData.about_me.map((content, index) => (
                            <p key={index}>{content.paragraph}</p>
                        ))}
                    </>
                )}
            </section>
            <div id='interesting-content'>
                <section id="currently-working-on">
                    <h2>Currently Working On</h2>
                    {acfData.currently_working_on && (
                        <ul>
                            {acfData.currently_working_on.map((content, index) => (
                                <li key={index}>{content.working_on}</li>
                            ))}
                        </ul>
                    )}
                </section>
                <section id="hobbies">
                    <h2>Hobbies</h2>
                    {acfData.hobbies && (
                        <ul>
                            {acfData.hobbies.map((content, index) => (
                                <li key={index}>{content.what_i_enjoy}</li>
                            ))}
                        </ul>
                    )}
                </section> 
            </div>
         
        </>
    )
}

export default AboutMe
