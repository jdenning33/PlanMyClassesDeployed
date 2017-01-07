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
    return parseInt( $(section).attr('number'), 10 ) < 100;
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

    sections[jsonSection.number] = jsonSection;

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
    return (  $(subject).attr('code') === 'ECE'   ||
              $(subject).attr('code') === 'MATH'   ||
              $(subject).attr('code') === 'CS'
            );
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

//There is a separate db for each campus i.e. /api/abq/subjects or api/abq/courses
//                                              /api/val/subjects
// only working with main campus right now
const handleCampus = ( xmlDoc ) => {
  let campuses = {};

  $(xmlDoc).find('campus')
  .filter( (index, campus) => {
    return 1;
  })
  .each( (index, campus) => {
    let subjects = handleSubjects(campus);

    campuses[$(campus).attr('code')] = {
      code: $(campus).attr('code'),
      name: $(campus).attr('name'),
      subjects: subjects
    }
  });

  return campuses;
};

//  loads the raw xml unm file then parses it to our json object that we'll
//  use to populate the unm data db
const buildUnmJsonModel = () => new Promise( (resolve, reject) => {
  axios.get('https://gist.githubusercontent.com/jdenning33/b7f33f04d96fe8012016f98bf231fc12/raw/d9d30cd28d246e8cf097dae79708f364334222b1/current.xml')
    .then( res => {

      var xmlDoc = res.data;
      let jsonSchedules = handleCampus( xmlDoc );
      resolve(jsonSchedules);
    })
    .catch( err => {
      reject(err);
    });
});

export default buildUnmJsonModel;
