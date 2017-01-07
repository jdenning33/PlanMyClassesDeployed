import { connect } from 'react-redux'
import ReducedCourseComponent from './ReducedCourseComponent'
import { dataCache } from '../../dataHandling/dataCache'
import { getReducedCourseJSON } from './ReducedCourseJSON'


const mapStateToProps = (state, ownProps) => {

  let courseID = ownProps.courseID;
  let course = state.dataCacheReducer.data.courses[courseID];
  let sections = state.dataCacheReducer.data.sections;

  let ready = true;
  if( !course ) ready = false;
  if( !ready || !course.sectionIDs.every( (id) => sections[id] )) ready = false;

  let reducedCourseJSON;
  if(ready){
    reducedCourseJSON = getReducedCourseJSON(course, sections);
  }

  return {
    ready: ready,
    course: course,
    courseID: courseID,
    reducedCourseJSON: reducedCourseJSON,
    active: true,
    fetchingIDs: state.dataCacheReducer.fetchingIDs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (dataIDs, collection) => {
      let promise;
      promise = dispatch( dataCache.fetchIfNeeded( {type: collection,
                                          originator: 'reducedCourseContainer',
                                          dataIDs: dataIDs }
                                        ));
      return promise;
    },

    setActive: (e) => {
      console.log(e);
      return;
    },
  }
}

const ReducedCourseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReducedCourseComponent)

export default ReducedCourseContainer
