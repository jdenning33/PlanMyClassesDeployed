import { connect } from 'react-redux'
import ScheduleStackComponent from './ScheduleStackComponent'
import { dataCache } from '../../dataHandling/dataCache'
import { scheduleBuilder } from '../../routes/ScheduleBuilder/scheduleBuilderDuck'



const mapStateToProps = (state, ownProps) => {

  let stackMap = ownProps.stackMap;
  let courseIDs = Object.keys(stackMap.data);

  // let courseIDs = ownProps.courseIDs;
  let courses = state.dataCacheReducer.data.courses;
  let sections = state.dataCacheReducer.data.sections;

  let ready;
  dataCache.areCoursesAndSectionsLoaded(sections, courses, courseIDs) ?
    ready=true: ready=false;

  return {
    ready: ready,
    courses: courses,
    sections: sections,
    courseIDs: courseIDs,
    stackMap: stackMap,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (dataIDs, collection) => {
      let promise;
      promise = dispatch( dataCache.fetchIfNeeded( {type: collection,
                                          originator: 'scheduleStackContainer',
                                          dataIDs: dataIDs }
                                        ));
      return promise;
    },

    switchActiveCourse: (removeID, addID) => {
      dispatch(
        scheduleBuilder.switchActiveCourse(removeID, addID)
      );
    },
    switchActiveSection: (courseID, sectionID) => {
      dispatch(
        scheduleBuilder.switchActiveSection(courseID, sectionID)
      );
    },

  }
}

const ScheduleStackContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleStackComponent)

export default ScheduleStackContainer
