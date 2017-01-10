import { connect } from 'react-redux'
import SubjectComponent from './SubjectComponent'
import { dataCache } from '../../dataHandling/dataCache'
import { courseBrowser } from '../../routes/CourseBrowser/courseBrowserDuck'

const mapStateToProps = (state, ownProps) => {

  let path = window.location.pathname;

  let subject = state.dataCacheReducer.data.subjects[ownProps.subjectID];

  //decide if the card should be expanded based on the expandedIDs
  let expanded = false;
  let expandedIDs = state.courseBrowserReducer.expandedIDs[path];
  if(expandedIDs && expandedIDs.length !== 0){
    expanded = expandedIDs.some((id) => ownProps.subjectID===id);
  }

  return {
    subject: subject,
    subjectID: ownProps.subjectID,
    expanded: expanded,
    fetchingIDs: state.dataCacheReducer.fetchingIDs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (dataID, collection) => {
      dispatch( dataCache.fetchIfNeeded( {type: collection,
                                          originator: 'subjectsContainer',
                                          dataIDs: [dataID] }
                                        ) );
    },
    cardClicked: (dataID, expanded) => {
      !expanded?
        dispatch( courseBrowser.expandCard(dataID) ):
        dispatch( courseBrowser.collapseCard(dataID));
    }
  }
}

const SubjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectComponent)

export default SubjectContainer
