// import LeftToRight from "./animation/LeftToRight";
import GsapAnimation from "./animation/GsapAnimation";

const ProjectSummary = ({acfData,fieldKey,title}) => {
  // const {sectionRefs} = LeftToRight(acfData[fieldKey])
  const { refs } = GsapAnimation(acfData[fieldKey]);
  if (!acfData[fieldKey] ) {
    return null; 
  }
  // need to change it to dl
  return (
    <div className="projectSummary">
      <h2>{title}</h2>
      <dl> 
        {acfData[fieldKey].map((feature, index) => (
          <div key={index} className='blue-border'
            ref={el => refs.current[index] = el}
          >
            <dt>{feature.title}: </dt>
            <dd className="description-text">{feature.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ProjectSummary