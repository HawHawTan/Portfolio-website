// Function to render ACF Key Features
const ProjectSummary = ({acfData,fieldKey,title}) => {
  if (!acfData[fieldKey] ) {
    return null; // Return null if no key features data
  }

  return (
    <section className="projectSummary">
      <h2>{title}</h2>
      <ul> 
        {acfData[fieldKey].map((feature, index) => (
          <li key={index} className='blue-border'>
            <strong>{feature.title}: </strong>
            <span className="description-text">{feature.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectSummary