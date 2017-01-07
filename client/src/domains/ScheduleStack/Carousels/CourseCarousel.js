import React from 'react';
import style from '../../../style'
import Carousel from '../../../Components/Carousel'
import Paper from 'material-ui/Paper';


const CoursePaper = ({course, active}) => {
  let z = (active)?1:2;
  let iStyle = (active)?style.courseActiveCarouselPaper :
                        style.courseCarouselPaper;
  return (
    <Paper style={iStyle} zDepth={z}>
      <div>
        {course.number} <br />
        {course.title}
      </div>
    </Paper>
  )
}

const CourseCarousel = ({courseIDs, activeCourseID, courses,
                            afterChange}) => {
  let elements =
  courseIDs.map( (courseID) => {

    let course = courses[courseID];

    let active = (courseID === activeCourseID);
    let iStyle = active ? style.activeCarouselItem : style.carouselItem;

    return(
      <div  key={courseID} style={iStyle}>
        <CoursePaper course={course}
                    active={active} />
      </div>
    )
  });

   return(
     <div style={style.courseCarousel}>
      <Carousel elements={elements}
                initialSlide={courseIDs.findIndex(id=>id===activeCourseID)}
                afterChange={afterChange} />
    </div>
  )
}

export default CourseCarousel
