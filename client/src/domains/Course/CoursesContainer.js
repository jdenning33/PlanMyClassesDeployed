import { connect } from 'react-redux'
import CoursesComponent from './CoursesComponent'
import { scheduleBuilder } from '../../routes/ScheduleBuilder/scheduleBuilderDuck'

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
    }
  }
}

const CoursesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesComponent)

export default CoursesContainer
