import React from 'react';
import style from '../../../style'
import Carousel from '../../../Components/Carousel'
import Paper from 'material-ui/Paper';


const SectionPaper = ({section, times, active}) => {
  let z = (active)?1:2;
  let iStyle = (active)?style.sectionActiveCarouselPaper :
                        style.sectionCarouselPaper;

  return (
    <Paper style={iStyle} zDepth={z}>
      <div>
        {times.length ?
          times.map( (time, index) => (
            <span key={index}>
              {time.days}: {time.start}-{time.end}
              <br />
            </span>
          ))
          : null}
        {section.instructors.length ?
          section.instructors.map( (instructor, index) => (
            <span key={index}>
              {instructor.name.first} {instructor.name.last}
              <br />
            </span>
          ))
          : null}
        {active? <span>crn: {section.crn}</span> : null}
      </div>
    </Paper>
  )
}


const SectionCarousel = ({sectionJSONs, activeSectionID, sections,
                          afterChange}) => {

  let sectionIDs = Object.keys(sectionJSONs);

  let elements =
  sectionIDs.map( (sectionID, index) => {

    let section = sections[sectionID];
    let times = sectionJSONs[sectionID].secondaryTimes;
    let active = (sectionID === activeSectionID);

    let iStyle = active ? style.activeCarouselItem : style.carouselItem;

    return(
      <div  style={iStyle}
             key={index}>
        <SectionPaper section={section}
                      times={times}
                      active={active} />
      </div>
    )
  });

  return(
    <div style={style.sectionCarousel}>
      <Carousel elements={elements}
                initialSlide={
                  sectionIDs.findIndex( (id) =>
                    id === activeSectionID)
                  }
                afterChange={afterChange} />
    </div>
  )
}

export default SectionCarousel
