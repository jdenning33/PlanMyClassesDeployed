import { connect } from 'react-redux'
import CoursesComponent from './CoursesComponent'
import { scheduleBuilder } from '../../routes/ScheduleBuilder/scheduleBuilderDuck'
import { COLLECTIONS_ENUM } from '../../dataHandling/dataCache'
import { dataCache } from '../../dataHandling/dataCache'

//Just requires an array of courseIDs
const mapStateToProps = (state, ownProps) => {

  let courseIDs = ownProps.courseIDs;
  let courses = state.dataCacheReducer.data.courses;

  let myCourses = {};
  courseIDs.forEach( (id) => {
    if(courses[id]){
      myCourses[id] = Object.assign({},courses[id]);
    }
  });

  return {
    courses: myCourses,
    courseIDs: courseIDs,
    setRelationship: ownProps.setRelationship,
    toggleSetRelationship: ownProps.toggleSetRelationship,
    stagedRelationship: state.scheduleBuilderReducer.newRelationship,
    activeCampusi: state.schedPrefReducer.campus,
    activeSemester: state.schedPrefReducer.semester
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    stageNewRelationship: (relationship) => {
      relationship.forEach(courseID =>
        dispatch(scheduleBuilder.stageNewRelationship(courseID)))
    },
    breakFromRelationship: (courseID) => {
      dispatch(scheduleBuilder.breakFromRelationship(courseID))
    },
    loadCourses: (courseIDs) => {
      dispatch(dataCache.fetchIfNeeded({
        type: COLLECTIONS_ENUM.COURSES,
        originator: 'coursesContainer',
        dataIDs: courseIDs
      }) )
    }
  }
}

const CoursesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesComponent)

export default CoursesContainer
