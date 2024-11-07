import React from 'react'
// import ScrollDowner from '../assets/animation/scrollDown.svg';
import ScrollDowner from '../assets/animation/scrollDown-v2.gif';
const ScrollDown = () => {
    return (
        <div className="scrollDown-container">
            <img src={ScrollDowner} alt="scrollDown" className="scrollDown" id="scrollDown" />
        </div>
    )
}

export default ScrollDown