import { connect } from 'react-redux'
import DesiredCoursesComponent from './DesiredCoursesComponent'
import { setRoute, ROUTE_ENUM } from '../../routes/AppRouter'

const mapStateToProps = (state, ownProps) => {

  let desiredIDs = [];
  for(let desiredID in state.scheduleBuilderReducer.desiredIDs){
    if(desiredID){
      desiredIDs.push(desiredID);
    }
  }

  return {
    courseIDs: desiredIDs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCourseButtonAction: () => {
      setRoute(ROUTE_ENUM.COURSE_BROWSER)
    }
  }
}

const DesiredCoursesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DesiredCoursesComponent)

export default DesiredCoursesContainer
