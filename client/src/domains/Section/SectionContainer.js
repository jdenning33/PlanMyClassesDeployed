import { connect } from 'react-redux'
import SectionComponent from './SectionComponent'
import { dataCache } from '../../dataHandling/dataCache'
import { courseBrowser } from '../../routes/CourseBrowser/courseBrowserDuck'

const mapStateToProps = (state, ownProps) => {

  let path = window.location.pathname;

  let section = state.dataCacheReducer.data.sections[ownProps.sectionID];

  //decide if the card should be expanded based on the expandedIDs
  let expanded = false;
  let expandedIDs;
  expandedIDs = state.courseBrowserReducer.expandedIDs[path];
  if(expandedIDs && expandedIDs.length !== 0){
    expanded = expandedIDs.some((id) => ownProps.sectionID===id);
  }

  return {
    section: section,
    sectionID: ownProps.sectionID,
    expanded: expanded,
    fetchingIDs: state.dataCacheReducer.fetchingIDs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (dataID, collection) => {
      dispatch( dataCache.fetchIfNeeded( {type: collection,
                                          originator: 'sectionsContainer',
                                          dataIDs: [dataID] }
                                        ) );
    },
    cardClicked: (dataID) => {
      dispatch( courseBrowser.cardClicked(dataID) );
    }
  }
}

const SectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionComponent)

export default SectionContainer
