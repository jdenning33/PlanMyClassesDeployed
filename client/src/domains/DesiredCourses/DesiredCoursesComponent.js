import React, { PropTypes } from 'react'
import LinkContainer from '../Link/LinkContainer'
import CoursesContainer from '../Course/CoursesContainer'


const DesiredCoursesComponent = ( { courseIDs, addCourseButtonAction } ) => {
  return (
    <div>
      <div>
        <h3> Desired Courses </h3>
        <div>
          <CoursesContainer courseIDs={courseIDs} />
          <br/>
          <LinkContainer    text='Add Course'
                            active={false}
                            clickAction={() => addCourseButtonAction()} />
        </div>

      </div>
    </div>
  )
}

DesiredCoursesComponent.propTypes = {
  courseIDs: PropTypes.array.isRequired,
  addCourseButtonAction: PropTypes.func.isRequired
}

export default DesiredCoursesComponent
