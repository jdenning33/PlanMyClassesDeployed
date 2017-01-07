import { connect } from 'react-redux'
import SetRelationshipsComponent from './SetRelationshipsComponent'
import { scheduleBuilder } from '../ScheduleBuilder/scheduleBuilderDuck'
import { COLLECTIONS_ENUM } from '../../dataHandling/dataCache'
import { setRoute }     from '../../routes/AppRouter'


const mapStateToProps = (state) => {

  // let courseIDs = state.scheduleBuilderReducer.desiredIDs;
  let stackMap = state.scheduleBuilderReducer.desiredMap;
  let courseIDs = Object.keys(stackMap.data);
  let courses = state.dataCacheReducer.data.courses;

  var links = [];
  state.schedPrefReducer.campus.forEach( preference => {
    if(preference != null) {
      links.push(preference);
    }
  });
  links.push(state.schedPrefReducer.semester);

  return {
    helpActive: state.scheduleBuilderReducer.isHelpActive,
    courseIDs: courseIDs,
    stackMap: stackMap,
    courses: courses,
    activeLinks: links,
    preferencesActive: state.scheduleBuilderReducer.isPreferencesActive,
    desriedActive: state.scheduleBuilderReducer.isDesiredActive,
    setRelationship: state.scheduleBuilderReducer.setRelationship
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleActiveData: (dataID, dataType) => {
      switch (dataType) {
        case COLLECTIONS_ENUM.course:

          break;
        default:

      }
    },
    openHelp: () => {
      dispatch( scheduleBuilder.openHelp() )
    },
    closeHelp: () => {
      dispatch( scheduleBuilder.closeHelp() )
    },
    togglePreferences: () => {
      dispatch( scheduleBuilder.togglePreferencesCard() )
    },
    toggleSetRelationship: (stackMap) => {
      dispatch( scheduleBuilder.toggleSetRelationship(stackMap) )
    },
    changeRoute: (route) => {
      setRoute(route)
    }
  }
}

const SetRelationshipsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SetRelationshipsComponent)

export default SetRelationshipsContainer
