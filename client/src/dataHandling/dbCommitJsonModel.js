import dataAPI, { COLLECTIONS_ENUM } from '../apis/dataAPI';
import buildUnmJsonModel from './buildUnmJsonModel'

const iterateObject = ( object, act ) => {
  for(let key in object){
    if(key){
      act(object[key]);
    };
  };
};

// For each course -> Add the course to the db -> Add each of it's sections
// to the db -> update the courses courseIDs
const handleSections = ( course, dbCourseId ) => new Promise(
  (resolve, reject) => {

  let promises = [];
  let sectionIDs = [];

  if(Object.keys(course.sections).length === 0) {
    resolve(); //there are no sections
  }

  //Iterate through each subject
  iterateObject( course.sections,
    (section) => {

      //Add the subject to the DB
      console.log('adding section');
      promises.push(dataAPI.add(
        { type:COLLECTIONS_ENUM.SECTIONS,
          data: Object.assign(section, { courseID: dbCourseId } ) }
      )
      .then( (dbSection) => {
        sectionIDs.push( dbSection._id );

          //make sure we don't resolve until the last section
          Promise.all(promises).then( () => {
            resolve(sectionIDs);
          });
      })
      .catch( (err) => reject(err) ));
    }
  );
});

// For each course -> Add the course to the db -> Add each of it's sections
// to the db -> update the courses courseIDs
const handleCourses = ( subject, dbSubjectId ) => new Promise(
  (resolve, reject) => {

  let promises = [];
  let courseIDs = [];

  if(Object.keys(subject.courses).length === 0) {
    resolve(); //there are no courses
  };

  //Iterate through each subject
  iterateObject( subject.courses,
    (course) => {

      //Add the subject to the DB
      console.log('adding course');
      promises.push(dataAPI.add(
        { type: COLLECTIONS_ENUM.COURSES,
          data: Object.assign(course, {subjectID: dbSubjectId} ) }
      )
      .then( (dbCourse) => {
        courseIDs.push( dbCourse._id );

        // Add each of the subjects courses to the DB
        promises.push(handleSections( course, dbCourse._id )
        .then( (sectionIDs) => {
          dbCourse.sectionIDs = sectionIDs;

          // Update the subject db listing
          console.log('updating course');
          promises.push(dataAPI.update(
            { type: COLLECTIONS_ENUM.COURSES,
              id: dbCourse._id,
              data: dbCourse }
          )
          .then( () => {
            // make sure we don't resolve until the last course
            Promise.all(promises).then( () => {
              resolve(courseIDs);
            });
          })
          .catch( (err) => reject(err) ));
        })
        .catch( (err) => reject(err) ));
      })
      .catch( (err) => reject(err) ));
    }
  );
});

// For each subject -> Add the subject to the db -> Add each of it's courses
// to the db -> update the subjects courseIDs
const handleSubjects = (school) => new Promise(
  (resolve, reject) => {

  let promises = [];
  let subjectIDs = [];
  console.log(school);
  if(Object.keys(school.subjects).length === 0) resolve(); //there are no subjects

  //Iterate through each subject
  iterateObject( school.subjects,
    (subject) => {

      // if(!(subject.code === 'ECE' || subject.code === 'MATH')) return;
      //Add the subject to the DB
      console.log('adding subject');
      promises.push(dataAPI.add(
        { type: COLLECTIONS_ENUM.SUBJECTS,
          data: subject }
      )
      .then( (dbSubject) => {
        subjectIDs.push( dbSubject._id );

        // Add each of the subjects courses to the DB

        promises.push(handleCourses( subject, dbSubject._id )
        .then( (courseIDs) => {
          dbSubject.courseIDs = courseIDs;

          // Update the subject db listing
          console.log('updating subject');
          promises.push(dataAPI.update(
            { type: COLLECTIONS_ENUM.SUBJECTS,
              id: dbSubject._id,
              data: dbSubject }
          )
          .then( () => {
            // make sure we don't resolve until the last subject
            Promise.all(promises).then( () => {
              resolve(subjectIDs);
            });
          })
          .catch( (err) => reject(err) ));
        })
        .catch( (err) => reject(err) ));
      })
      .catch( (err) => reject(err) ));
    }
  );
});




export const dbCommitJsonModel = (jsonModel) => new Promise(
(resolve, reject) => {

  if(jsonModel){
    let school = jsonModel['ABQ'];
    handleSubjects(school)
    .then( () => {
      console.log('finished');
      resolve(jsonModel);
    })
    .catch( (err) => {
      console.log(err)
    });
  }

  buildUnmJsonModel()
  .then((jsonModel) => new Promise( (resolve, reject) => {
    console.log(jsonModel);
    let school = jsonModel['201680'].campusi['ABQ'];
    handleSubjects(school)
    .then( () => {
      console.log('finished');
      resolve(jsonModel);
    })
    .catch( (err) => {
      console.log(err)
    });
  }))
  .then( (jsonModel) => resolve(jsonModel));
});
