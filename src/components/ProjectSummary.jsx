import LeftToRight from "./animation/LeftToRight";

const ProjectSummary = ({acfData,fieldKey,title}) => {
  const {sectionRefs} = LeftToRight(acfData[fieldKey])
  if (!acfData[fieldKey] ) {
    return null; 
  }
  // need to change it to dl
  return (
    <section className="projectSummary">
      <h2>{title}</h2>
      <dl> 
        {acfData[fieldKey].map((feature, index) => (
          <div key={index} className='blue-border'
            ref={el => sectionRefs.current[index] = el}
          >
            <dt>{feature.title}: </dt>
            <dd className="description-text">{feature.description}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default ProjectSummary