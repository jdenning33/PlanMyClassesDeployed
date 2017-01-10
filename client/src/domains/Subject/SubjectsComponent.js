import React from 'react';
import SubjectContainer from './SubjectContainer';
import { dataCache } from '../../dataHandling/dataCache'


class SubjectsComponent extends React.Component{
  constructor( {subjects, subjectIDs} ){
    super();
  }

  render(){
    let my = this.props;

    let filteredIDs;
    if(Object.keys(my.subjects).length &&
      dataCache.isDataLoaded(my.subjects, my.subjectIDs)){
      filteredIDs = my.subjectIDs.sort( (id1, id2) => {
        let name1 = my.subjects[id1].name;
        let name2 = my.subjects[id2].name;

        if(name1 === name2) return 0;
        if(name1 > name2) return 1;
        return -1;
      });
    } else {
      return <div style={{textAlign:'center'}}>loading</div>
    }

    if(!filteredIDs.length){
      return <div style={{textAlign:'center'}}>no subjects match</div>
    }

    return(
      <span>
        {filteredIDs.map( (subjectID) => (
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
