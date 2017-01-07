const getPrimaryTime = (times) => {
  let ptime;
  times.forEach( time => {
    if(!ptime || time.days.length > ptime.days.length) ptime = time;
  });
  return ptime;
}

const compareTimes = (time1, time2) => {
  if(!time1 || !time2) return false;
  if(time1.days.length !== time2.days.length) return false;
  if(time1.start  !==  time2.start ) return false;
  if(time1.end    !==  time2.end   ) return false;

  if(!time1.days.some( (day1) => (
    time2.days.some( (day2) => (
      day1 === day2
    ))
  ))) return false;
  return true;
}

const getSecondaryTimes = (times) => {
  let ptime = getPrimaryTime(times);
  let stimes = [].concat(times);

  stimes = stimes.filter(time => {
    return !compareTimes(ptime, time);
  });

  return stimes;
}

//Finds the primary time in each times[] then compares them
const comparePrimaryTimes = (times1, times2) => {
  //Try to compare the lecture time, not the lab time
  let time1 = getPrimaryTime(times1);
  let time2 = getPrimaryTime(times2);

  if(compareTimes(time1, time2)) return time1;
  return false;
}

export const getReducedCourseJSON = (course, sections) => {
  let reducedCourseJSON = {};
  let reducedCourseJSON2 = [];


  let sectionIDs = [];
  sectionIDs = sectionIDs.concat(course.sectionIDs);
  while(sectionIDs.length){
    let primarySectionID = sectionIDs.pop();
    let primarySection = sections[primarySectionID];

    //new
    let newSectionGroup =
    { sectionIDs:
      { [primarySectionID]:
        { secondaryTimes:getSecondaryTimes(primarySection.times)
        }
      },
      primaryTime:getPrimaryTime(primarySection.times)
    };
    //new

    reducedCourseJSON[primarySectionID] = [];

    // eslint-disable-next-line
    sectionIDs.forEach( (sectionID) => {
      let section = sections[sectionID];

      let primaryTime = comparePrimaryTimes(section.times, primarySection.times) ;
      if( primaryTime ){
        reducedCourseJSON[primarySectionID].push(sectionID);
        reducedCourseJSON[primarySectionID].primaryTime = primaryTime;

        //new
        newSectionGroup.sectionIDs[sectionID] =
        { secondaryTimes: getSecondaryTimes(section.times) };
        //new

        //remove the section we just compared
        sectionIDs = sectionIDs.filter((id)=> sectionID!==id);
      }
    })
    //new
    reducedCourseJSON2.push(newSectionGroup);
    //new
  }

  return reducedCourseJSON2;
}
