import loading from '../assets/loading.gif';
// import loading from '../assets/bouncing-circles.svg';

const Loading = () => {
    
    return (
        <div className="loading-container">
            <img src={loading} alt="Loading" className="loading" id="loading" />
            <img src={loading} alt="Loading" className="loading" id="loading" />
        </div>
    )

}

export default Loading
