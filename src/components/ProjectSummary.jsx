// Function to render ACF Key Features
const ProjectSummary = ({acfData,fieldKey,title}) => {
  if (!acfData[fieldKey] ) {
    return null; // Return null if no key features data
  }

  return (
    <div className="projectSummary">
      <h2>{title}</h2>
      <ul>
        {acfData[fieldKey].map((feature, index) => (
          <li key={index} className='blue-border'>
            <strong>{feature.title}: </strong>
            <br />
            <span className="description-text">{feature.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectSummary