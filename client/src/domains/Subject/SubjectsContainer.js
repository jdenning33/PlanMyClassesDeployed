import { connect } from 'react-redux'
import SubjectsComponent from './SubjectsComponent'

const mapStateToProps = (state, ownProps) => {

  let subjectIDs = ownProps.subjectIDs;
  let subjects = state.dataCacheReducer.data.subjects;

  let mySubjects = {};
  subjectIDs.forEach( (id) => {
    if(subjects[id]){
      mySubjects[id] = subjects[id];
    }
  });

  return {
    subjects: subjects,
    subjectIDs: subjectIDs,
    activeCampusi: state.schedPrefReducer.campus,
    activeSemester: state.schedPrefReducer.semester
  }
}

const mapDispatchToProps = (dispatch) => {
  return{

  }
}

const SubjectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectsComponent)

export default SubjectsContainer
