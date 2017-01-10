import { connect } from 'react-redux'
import CourseComponent from './CourseComponent'
import { dataCache } from '../../dataHandling/dataCache'
import { scheduleBuilder } from '../../routes/ScheduleBuilder/scheduleBuilderDuck'
import { courseBrowser } from '../../routes/CourseBrowser/courseBrowserDuck'

const mapStateToProps = (state, ownProps) => {

  let path = window.location.pathname;

  let course = state.dataCacheReducer.data.courses[ownProps.courseID];

  //check if the card is already in the desired course load
  let isDesired = false;
  let stackMap = state.scheduleBuilderReducer.desiredMap;
  isDesired = stackMap.data[ownProps.courseID] ? true:false;

  //decide if the card should be expanded based on the expandedIDs
  let expanded = false;
  let expandedIDs;
  expandedIDs = state.courseBrowserReducer.expandedIDs[path];
  if(expandedIDs && expandedIDs.length !== 0){
    expanded = expandedIDs.some((id) => ownProps.courseID===id);
  }

  return {
    course: course,
    courseID: ownProps.courseID,
    isDesired: isDesired,
    expanded: expanded,
    ready: ownProps.ready,
    fetchingIDs: state.dataCacheReducer.fetchingIDs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (dataID, collection) => {
      dispatch( dataCache.fetchIfNeeded( {type: collection,
                                          originator: 'courseContainer',
                                          dataIDs: [dataID] }
                                        ) );
    },
    toggleDesiredCourse: (course) => {
      dispatch( scheduleBuilder.toggleDesiredCourse(course) );
    },
    cardClicked: (dataID) => {
      dispatch( courseBrowser.cardClicked(dataID) );
    }
  }
}

const CourseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseComponent)

export default CourseContainer
