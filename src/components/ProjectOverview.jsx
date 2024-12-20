import React from 'react'

function ProjectOverview({acfData}) {
if (!acfData ) {
    return null; 
    }
  return (
    <section className="projectOverview">
        {acfData.macbook_video && (
          <div className="video-div">
            <video autoPlay muted playsInline>
              <source src={acfData.macbook_video} type="video/mp4" />
            </video>
          </div>
        )}
        <div className='group-content'>
          <h1 tabIndex={1}>{ acfData.title}</h1>
          <div className='group-inner-content'>
            <h2 tabIndex={2}>Project Overview</h2>
            <p tabIndex={3}>{acfData.project_overview}</p>
          </div>
          {/* <p>{acfData.project_overview}</p> */}
          <div className='buttons'>
              <a href={`${acfData.github}`}>GitHub</a> 
              <a href={`${acfData.live_site}`}>Live Site</a>
          </div>
        </div>
    </section>
  )
}

export default ProjectOverview