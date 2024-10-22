import React from 'react'

function ProjectOverview({acfData}) {
if (!acfData ) {
    return null; 
    }
  return (
    <section className="projectOverview">
        <h1>{acfData.title}</h1>
        <h2>Project Overview</h2>
        <p>{acfData.project_overview}</p>
        <div className='buttons'>
            {/* help, do i use A tag */}
            <a href={`${acfData.github}`}>GitHub</a> 
            <a href={`${acfData.live_site}`}>Live Site</a>
        </div>
    </section>
  )
}

export default ProjectOverview