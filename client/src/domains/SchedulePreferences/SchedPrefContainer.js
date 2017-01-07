import { connect } from 'react-redux'
import SchedPrefComponent from './SchedPrefComponent'
import { setCampus, setSemester, setOnlineDesire } from './schedPrefDuck'

const mapStateToProps = (state, ownProps) => {

  var links = [];
  state.schedPrefReducer.campus.forEach( preference => {
    if(preference != null) {
      links.push(preference);
    }
  });
  links.push(state.schedPrefReducer.semester);

  return {
    activeLinks: links
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCampusClick: (campus) => {
      dispatch( setCampus(campus) );
    },
    setSemesterClick: (semester) => {
      dispatch(setSemester(semester));
    },
    setOnlineDesireClick: (desire) => {
      dispatch(setOnlineDesire(desire));
    }
  }
}

const SchedPrefContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedPrefComponent)

export default SchedPrefContainer
