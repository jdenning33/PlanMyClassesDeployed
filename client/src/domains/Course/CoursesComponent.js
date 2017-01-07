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
                  stagedRelationship,
                  breakFromRelationship, stageNewRelationship} ){
    super();
  }

  render(){
    let my = this.props;

    if(Object.keys(my.courses).length === my.courseIDs.length){
      my.courseIDs.sort( (id1, id2) => {
        if(!my.courses[id1] || !my.courses[id2]) return 0;
        else {
          return stripAndParse(my.courses[id1].number) -
                  stripAndParse(my.courses[id2].number);
        }
      });
    }

    if(my.setRelationship){
      return(
        <div>
          {/* {(my.courses[my.courseIDs[0]]) ?
            <CourseContainer courseID={my.courseIDs[0]} /> : null} */}
          {my.courseIDs.map(courseID => {
            let staged = my.stagedRelationship.some(id => id===courseID);
            return(
              // (courseID === my.courseIDs[0]) ? null :
                <span>
                  <CourseContainer courseID={courseID} />
                  <span style={style.orIcon}>
                    <OrIcon staged={staged}
                      onTouchTap={()=>my.stageNewRelationship(my.courseIDs)} />
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
        {my.courseIDs.map( (courseID) => (
            <span key={courseID}>
              <CourseContainer  courseID={courseID}  />
            </span>
          )
        )}
      </span>
    )
  }
};

export default CoursesComponent
