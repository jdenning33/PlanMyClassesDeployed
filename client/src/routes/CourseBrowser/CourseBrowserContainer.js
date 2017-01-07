import { connect } from 'react-redux'
import CourseBrowserComponent from './CourseBrowserComponent'
import { courseBrowser } from './courseBrowserDuck'
import { COLLECTIONS_ENUM } from '../../dataHandling/dataCache'
import { dataCache } from '../../dataHandling/dataCache'

const mapStateToProps = (state, ownProps) => {

  let subjects = state.dataCacheReducer.data.subjects;
  let subjectIDs = Object.keys(subjects);

  let filter = state.courseBrowserReducer.filter;

  let filteredIDs = subjectIDs.filter( id => {
    let filt = filter.toLowerCase();
    let code = subjects[id].code.toLowerCase();
    let name = subjects[id].name.toLowerCase();
    return(
      code.includes(filt)  ||
      name.includes(filt)
    )
  });

  var links = [];
  state.schedPrefReducer.campus.forEach( preference => {
    if(preference != null) {
      links.push(preference);
    }
  });
  links.push(state.schedPrefReducer.semester);

  return {
    helpActive: state.courseBrowserReducer.isHelpActive,
    activeLinks: links,
    subjectIDs: filteredIDs,
    currentFilter: filter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSubjects: () => {
      dispatch( dataCache.fetchIfNeeded({ type: COLLECTIONS_ENUM.SUBJECTS,
                                          originator: 'courseBrowserContainer',
                                          dataIDs: null}) )
    },
    openHelp: () => {
      dispatch( courseBrowser.openHelp() )
    },
    closeHelp: () => {
      dispatch( courseBrowser.closeHelp() )
    },

    updateFilter: (value) => {
      dispatch( courseBrowser.updateFilter(value) )
    }
  }
}

const CourseBrowserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseBrowserComponent)

export default CourseBrowserContainer
