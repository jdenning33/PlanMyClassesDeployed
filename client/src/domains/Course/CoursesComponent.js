import React from 'react';
import CourseContainer from './CourseContainer';
import FloatingButton from 'material-ui/FloatingActionButton';
// import OrIcon from 'material-ui/svg-icons/content/add-circle-outline';
// import AddCircle from 'material-ui/svg-icons/content/add-circle-outline';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentAdd from 'material-ui/svg-icons/content/link';
import style from '../../style'

const OrIcon = ({onTouchTap, staged}) => (
  <span >
    <FloatingButton className="material-icons"
                backgroundColor={!staged? '#B2EBF2' : '#4DD0E1'}
                mini={true}
                zDepth={1}
                onTouchTap={onTouchTap}><ContentAdd/></FloatingButton>
  </span>
)
const BreakIcon = ({onTouchTap}) => (
  <span >
    <FloatingButton className="material-icons"
                backgroundColor='#F06292'
                mini={true}
                zDepth={1}
                onTouchTap={onTouchTap}><ContentRemove/></FloatingButton>
  </span>
)

const stripAndParse = (str) => {
  return parseInt( str.replace(/\D/g,''), 10 );
};

class CoursesComponent extends React.Component{
  constructor( {courses, courseIDs, setRelationship = false,
                  stagedRelationship, activeCampusi, activeSemester,
                  breakFromRelationship, stageNewRelationship, loadCourses} ){
    super();
  }

  componentWillMount(){
    let my = this.props;
    my.loadCourses(my.courseIDs);
  }

  render(){
    let my = this.props;
    let ready = false;

    if(Object.keys(my.courses).length === my.courseIDs.length){
      ready = true;
    }

    if(!ready) return <div style={{textAlign:'center'}}>loading</div>

    let filteredIDs = my.courseIDs
    .filter( (id) => {
      return(
        my.courses[id].campusi.some( (campus) => (
          my.activeCampusi.some( (activeCampus) => campus === activeCampus.code)
        ))
        &&
        my.courses[id].semesters.some( (semester) => semester === my.activeSemester.code)
      )
    })
    .sort( (id1, id2) => {
      if(!my.courses[id1] && !my.courses[id2]) return 0;
      if(!my.courses[id1] &&  my.courses[id2]) return 1;
      if(my.courses[id1]  && !my.courses[id2]) return -1;

      return stripAndParse(my.courses[id1].number) -
              stripAndParse(my.courses[id2].number);
    });

    if(my.setRelationship){
      return(
        <div>
          {filteredIDs.map(courseID => {
            let staged = my.stagedRelationship.some(id => id===courseID);
            return(
              // (courseID === my.courseIDs[0]) ? null :
                <span key={courseID}>
                  <CourseContainer courseID={courseID} ready={ready} />
                  <span style={style.orIcon}>
                    <OrIcon staged={staged}
                      onTouchTap={()=>my.stageNewRelationship(filteredIDs)} />
                    {(my.courseIDs.length > 1) ?
                      <BreakIcon staged={staged}
                        onTouchTap={()=>my.breakFromRelationship(courseID)} />
                      : null
                    }
                  </span>
                </span>
              )
            }
          )}
        </div>
      )
    }

    return(
      <span>
        {filteredIDs.map( (courseID) => {
          if(!my.courses[courseID]) return <div key={courseID}>loading</div>

          return (
            <span key={courseID}>
              <CourseContainer  courseID={courseID} ready={ready} />
            </span>
          )
        })}
      </span>
    )
  }
};

export default CoursesComponent
