import React from 'react';
import SubjectContainer from './SubjectContainer';


class SubjectsComponent extends React.Component{
  constructor( {subjects, subjectIDs} ){
    super();
  }

  render(){
    let my = this.props;

    if(Object.keys(my.subjects).length === my.subjectIDs.length){
      my.subjectIDs.sort( (id1, id2) => {
        if(!my.subjects[id1] || !my.subjects[id2]) return 0;
        else {
          return my.subjects[id1].code - my.subjects[id2].code;
        }
      });
    }

    return(
      <span>
        {my.subjectIDs.map( (subjectID) => (
            <span key={subjectID}>
              <SubjectContainer  subjectID={subjectID} />
            </span>
          )
        )}
      </span>
    )
  }
};

export default SubjectsComponent
