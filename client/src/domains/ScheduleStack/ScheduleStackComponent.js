import React from 'react';
import style from '../../style'
import { dataCache } from '../../dataHandling/dataCache'
import CourseCarousel from './Carousels/CourseCarousel'
import PrimaryTimeCarousel from './Carousels/PrimaryTimeCarousel'
import SectionCarousel from './Carousels/SectionCarousel'
import { getReducedCourseJSON } from '../ReducedCourse/ReducedCourseJSON'
import Divider from 'material-ui/Divider'

 const getRelationShipSize = (relationship, courses) => {
   let size = 0;
   relationship.forEach( (courseID) => {
     size += courses[courseID].sectionIDs.length;
   });
   return size;
 }

class ScheduleStackComponent extends React.Component{
  constructor( {ready, courses, sections, courseIDs, stackMap,
                  getData, setActive, removeActive} ){
    super();
  }

  componentWillMount(){
    let my = this.props;
    dataCache.deepLoadCourses(my.courseIDs, my.getData);
  }

  render(){
    let my = this.props;

    if(!my.ready) return (<div>loading</div>)

    let relationships = my.stackMap.relationships.sort( (a,b) => {
      return ( getRelationShipSize(a, my.courses) -
               getRelationShipSize(b, my.courses) );
    })

    let elements =
    relationships.map( (relationship) => {
      //Get our active course id
      let activeCourseID = relationship.find( (id) => {
          return my.stackMap.activeCourseIDs.some(id2=>id===id2)
        });

      //Define our option variables
      let activeCourse;     let primaryTimesJSON;
      let activeTime;       let sectionJSONs;
      let sectionIDs;       let activeSectionID;

      //If there is an activeCourseID we can calculate our PrimaryTimeCarousel
      if(activeCourseID) {
        //Caclulate our primary time info
        activeCourse = my.courses[activeCourseID];
        primaryTimesJSON = getReducedCourseJSON(activeCourse, my.sections);
        primaryTimesJSON = primaryTimesJSON.filter(
          time => (time.primaryTime!==undefined) );

        //Hopefully we already have an active section ID
        activeSectionID = my.stackMap.data[activeCourseID].activeSectionID;

        // console.log(primaryTimesJSON);
        if(activeSectionID){
          //If we do find the active time
          activeTime =
          primaryTimesJSON.find( (timeJSON) => (
            Object.keys(timeJSON.sectionIDs).some( (sectionID) => (
              sectionID === activeSectionID
            ))
          ));
        }

        if(!activeSectionID ||
            !activeTime ||
            !activeTime.primaryTime){
          activeTime =
            primaryTimesJSON.find(time=>
              time.primaryTime !== undefined);
        }

        sectionJSONs = activeTime.sectionIDs;
        sectionIDs = Object.keys(sectionJSONs);
        if(!activeSectionID) activeSectionID = sectionIDs[0];

      }

      return(
        <div  key={activeCourseID}
              style={style.courseStack}>

              {relationship !== relationships[0] ?
                <Divider /> : null }
          <br />
          <CourseCarousel   courseIDs={relationship}
                            activeCourseID={activeCourseID}
                            courses={my.courses}
                            sections={my.sections}
                            afterChange={(e) =>
                            my.switchActiveCourse(activeCourseID,
                                                  relationship[e]
                                                )}
          />

          { (activeCourseID) ?
            <PrimaryTimeCarousel  timesJSON={primaryTimesJSON}
                                  activeTime={activeTime.primaryTime}
                                  afterChange={(e) =>
                                  my.switchActiveSection(
                                    activeCourseID,
                      Object.keys(primaryTimesJSON[e].sectionIDs)[0] )}
            />
          : null
          }
          { (sectionJSONs) ?
            <SectionCarousel      sectionJSONs={sectionJSONs}
                                  activeSectionID={activeSectionID}
                                  sections={my.sections}
                                  afterChange={(e) =>
                                  my.switchActiveSection(
                                    activeCourseID,
                      Object.keys(activeTime.sectionIDs)[e]  )}
            />
            : null
          }
        </div>
      )
    });

    return (
      <div style={style.scheduleStack}>
        {elements}
      </div>
    )
  }
}


export default ScheduleStackComponent
