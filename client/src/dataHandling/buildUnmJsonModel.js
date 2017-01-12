import axios from 'axios';
import $ from 'jquery'

const stripAndParseInt = ( str ) => {
  let num = str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\s\{\}\[\]\\\/]/gi, '');
  return parseInt(num, 10);
};

const handleInstructors = ( section ) => {
  let instructors = [];

  $(section).find('instructor')
  .filter( (index, section) => {
    return 1;
  })
  .each( (index, instructor) => {
    let name =  { first:  $(instructor).find('first').text(),
                  last:   $(instructor).find('last').text()
                };
    let email = $(instructor).find('email').text();

    let jsonInstructor =
      { name: name,
        email: email,
      };

    instructors.push(jsonInstructor);
  });

  return instructors;
};

const handleTimes = ( section ) => {
  let times = [];

  $(section).find('meeting-time')
  .filter( (index, section) => {
    return 1;
  })
  .each( (index, time) => {
    let days = [];
    $(time).find('day').each( (index, day) => { days.push($(day).text()) });

    let jsonTime =
      { days  : days,
        start : stripAndParseInt( $(time).find('start-time').text() ),
        end   : stripAndParseInt( $(time).find('end-time').text() ),
        date : { start : $(time).find('start-date').text(),
                  end   : $(time).find('end-date').text()
                }
      };

    times.push(jsonTime);
  });

  return times;
};

const handleSections = ( course ) => {
  let sections = {};

  $(course).find('section')
  .filter( (index, section) => {
    //  TODO: support crossover listings
    //  crossover listings are recorded as sections
    //  10 is saying that it is base 10
    return !($(section).attr('subject'));
  })
  .each( (index, section) => {
    let instructors = handleInstructors( section );
    let times = handleTimes( section );

    let jsonSection =
      { //courseID    : , //have to add this in the dbCommit
        number      : $(section).attr('number'),
        crn         : stripAndParseInt( $(section).attr('crn') ),
        instructors : instructors,
        times       : times
      }

    sections[jsonSection.crn] = jsonSection;

  });

  return sections;
};

const handleCourses = ( subject ) => {
  let courses = {};

  $(subject).find('course')
  .filter( (index, course) => {
    return 1;
  })
  .each( (index, course) => {
    let sections = handleSections( course );
    let credits = [];

    $(course).find('credits').each( (index, credit) => {
      let cred = parseInt( $(credit).text() , 10 );
      if( credits.find( (cre) => cre === cred ) ) return; //don't re-add the same val
      credits.push( cred );
    });

    let jsonCourse =
      { title     : $(course).attr('title'),
        number    : $(course).attr('number'),
        subject   : $(subject).attr('code'),
        description : $(course).find('catalog-description').text(),
        credits   : credits,
        sections  : sections  //get converted to sectionIDs during dbAdd
      }

    courses[jsonCourse.number] = jsonCourse;
  });

  return courses;
};

const handleSubjects = ( campus ) => {
  let subjects = {};

  $(campus).find('subject')
  .filter( (index, subject) => {
    return 1;
    // return (  $(subject).attr('code') === 'ECE' );
  })
  .each( (index, subject) => {
    let courses = handleCourses( subject );

    subjects[$(subject).attr('code')] = {
      code: $(subject).attr('code'),
      name: $(subject).attr('name'),
      courses: courses
    } ;

  });

  return subjects;
};

const handleCampus = ( semester ) => {
  let campusi = {};

  $(semester).find('campus')
  .filter( (index, campus) => {
    return 1;
  })
  .each( (index, campus) => {
    let subjects = handleSubjects(campus);

    campusi[$(campus).attr('code')] = {
      code: $(campus).attr('code'),
      name: $(campus).attr('name'),
      semester: $(semester).attr('code'),
      subjects: subjects
    }
  });

  return campusi;
};

//There is a separate db for each semester i.e. /api/S2016/subjects or api/S2016/courses
//                                              /api/F2017/subjects
// only working with current semester
const handleSemester = ( xmlDoc ) => {
  let semesterJson = {};

  $(xmlDoc).find('semester')
  .filter( (index, semester) => {
    return 1;
  })
  .each( (index, semester) => {
    let campusi = handleCampus(semester);
    // let code = $(semester).attr('code');
    semesterJson = {
      code: $(semester).attr('code'),
      name: $(semester).attr('name'),
      campusi: campusi
    }
  });

  return semesterJson;
};

//  loads the raw xml unm file then parses it to our json object that we'll
//  use to populate the unm data db
const buildUnmJsonModel = () => new Promise( (resolve, reject) => {
  let jsonSchedule = {};
  let promises = [];
  promises.push(
    axios.get('https://gist.githubusercontent.com/jdenning33/b7f33f04d96fe8012016f98bf231fc12/raw/d9d30cd28d246e8cf097dae79708f364334222b1/current.xml')
    .then( res => {

      var xmlDoc = res.data;
      let semester = handleSemester( xmlDoc );
      jsonSchedule[semester.code] = semester;
    })
    .catch( err => {
      reject(err);
    })
  );
  promises.push(
    axios.get('https://gist.githubusercontent.com/jdenning33/9f31c123bf45536a65b9ebcb94ba924d/raw/5d550b425ef08934488d7fc4110c6a3c2677aeb7/next1.xml')
    .then( res => {

      var xmlDoc = res.data;
      let semester = handleSemester( xmlDoc );
      jsonSchedule[semester.code] = semester;
    })
    .catch( err => {
      reject(err);
    })
  );

  Promise.all(promises)
  .then(() => resolve(jsonSchedule));
});

export default buildUnmJsonModel;
