import { connect } from 'react-redux'
import SectionsComponent from './SectionsComponent'

const mapStateToProps = (state, ownProps) => {

  let sectionIDs = ownProps.sectionIDs;
  let sections = state.dataCacheReducer.data.sections;

  let mySections = {};
  sectionIDs.forEach( (id) => {
    if(sections[id]){
      mySections[id] = sections[id];
    }
  });

  return {
    sections: mySections,
    sectionIDs: sectionIDs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{

  }
}

const SectionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionsComponent)

export default SectionsContainer
