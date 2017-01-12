import React from 'react';
import SectionContainer from './SectionContainer';


const stripAndParse = (str) => {
  return parseInt( str.replace(/\D/g,''), 10 );
};

class SectionsComponent extends React.Component{
  constructor( {sections, sectionIDs, activeCampusi, activeSemester} ){
    super();
  }

  render(){
    let my = this.props;
    let filteredIDs = my.sectionIDs;

    if(Object.keys(my.sections).length === my.sectionIDs.length){
      filteredIDs = filteredIDs
      .filter( (id) => {
        return(
          my.activeCampusi.some( (activeCampus) => my.sections[id].campus === activeCampus.code)
          &&
          my.sections[id].semester === my.activeSemester.code
        )
      })
      .sort( (id1, id2) => {
        if(!my.sections[id1] || !my.sections[id2]) return 0;
        else {
          return stripAndParse(my.sections[id1].number) -
                  stripAndParse(my.sections[id2].number);
        }
      });
    }

    return(
      <span>
        {filteredIDs.map( (sectionID) => (
            <span key={sectionID}>
              <SectionContainer  sectionID={sectionID} />
            </span>
          )
        )}
      </span>
    )
  }
};

export default SectionsComponent
