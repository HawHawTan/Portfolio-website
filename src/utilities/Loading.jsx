import React from 'react'
import Loader from '../assets/animation/bouncing-circles.svg';
const Loading = () => {
    
    return (
        <div className="loading-container">
            <img src={Loader} alt="Loading" className="loading" id="loading" />
        </div>
    )

}

export default Loading
