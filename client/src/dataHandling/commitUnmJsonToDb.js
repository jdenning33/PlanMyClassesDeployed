import dataAPI, { COLLECTIONS_ENUM } from '../apis/dataAPI';
import buildUnmJsonModel from './buildUnmJsonModel'
import collapseUnmJsonModel from './collapseUnmJsonModel'


const handleSection = (section) => new Promise(
(resolve, reject) => {

  console.log('adding section');
  //Add the subject to the db
  dataAPI.add(
    { type: COLLECTIONS_ENUM.SECTIONS,
      data: section }
  )
  .then( (dbSection) => {
    let dbSectionID = dbSection._id;
    resolve(dbSectionID);
  })
  .catch( (err) => reject(err) );
});

const handleSections = (sections, sectionIDs) => new Promise(
(resolve, reject) => {
  let dbSectionIDs = [];

  if(sectionIDs === undefined){
    sectionIDs = Object.keys(sections);
  }
  else if(sectionIDs.length === 0){
    //we've reached the end of our subjects
    resolve(dbSectionIDs);
    return;
  }

  let section = sections[sectionIDs.pop()];
  //handle the first subject remaining
  handleSection(section)
  .then( (dbSectionID) => {
    //add that subject id to the dbSubjectIDs
    dbSectionIDs = dbSectionIDs.concat(dbSectionID);

    //then handle the other subjectIDs
    handleSections(sections, sectionIDs)
    .then( (dbIDs) => {
      //then add those subjectIDs to the dbSubjectIDs
      dbSectionIDs = dbSectionIDs.concat(dbIDs);

      //return our new dbSubjectIDs
      resolve(dbSectionIDs);
    })
  })
});



const handleCourse = (course) => new Promise(
(resolve, reject) => {

  console.log('adding course');
  //Add the subject to the db
  dataAPI.add(
    { type: COLLECTIONS_ENUM.COURSES,
      data: course }
  )
  .then( (dbCourse) => {
    let dbCourseID = dbCourse._id;
    resolve(dbCourseID);
    // Add each of the subjects courses to the DB
    handleSections( course.sections )
    .then( (sectionIDs) => {
      dbCourse.sectionIDs = sectionIDs;

      // Update the subject db listing
      console.log('updating course');
      dataAPI.update(
        { type: COLLECTIONS_ENUM.COURSES,
          id: dbCourseID,
          data: dbCourse }
      )
      .then( () => {
        resolve(dbCourseID);
      })
      .catch( (err) => reject(err) );
    })
    .catch( (err) => reject(err) );
  })
  .catch( (err) => reject(err) );
});

const handleCourses = (courses, courseIDs) => new Promise(
(resolve, reject) => {
  let dbCourseIDs = [];

  if(courseIDs === undefined){
    courseIDs = Object.keys(courses);
  }
  else if(courseIDs.length === 0){
    //we've reached the end of our subjects
    resolve(dbCourseIDs);
    return;
  }

  let course = courses[courseIDs.pop()];
  //handle the first subject remaining
  handleCourse(course)
  .then( (dbCourseID) => {
    //add that subject id to the dbSubjectIDs
    dbCourseIDs = dbCourseIDs.concat(dbCourseID);

    //then handle the other subjectIDs
    handleCourses(courses, courseIDs)
    .then( (dbIDs) => {
      //then add those subjectIDs to the dbSubjectIDs
      dbCourseIDs = dbCourseIDs.concat(dbIDs);

      //return our new dbSubjectIDs
      resolve(dbCourseIDs);
    })
  })
});

const handleSubject = (subject) => new Promise(
(resolve, reject) => {

  console.log('adding subject');
  //Add the subject to the db
  dataAPI.add(
    { type: COLLECTIONS_ENUM.SUBJECTS,
      data: subject }
  )
  .then( (dbSubject) => {
    let dbSubjectID = dbSubject._id;

    // Add each of the subjects courses to the DB
    handleCourses(subject.courses)
    .then( (courseIDs) => {
      dbSubject.courseIDs = courseIDs;

      console.log(courseIDs);


      // Update the subject db listing
      console.log('updating subject');
      dataAPI.update(
        { type: COLLECTIONS_ENUM.SUBJECTS,
          id: dbSubjectID,
          data: dbSubject }
      )
      .then( () => {
        resolve(dbSubjectID);
      })
      .catch( (err) => reject(err) );
    })
    .catch( (err) => reject(err) );
  })
  .catch( (err) => reject(err) );
});

const handleSubjects = (subjects, subjectIDs) => new Promise(
(resolve, reject) => {
  let dbSubjectIDs = [];

  if(subjectIDs === undefined){
    subjectIDs = Object.keys(subjects);
  }
  else if(!subjectIDs.length){
    //we've reached the end of our subjects
    resolve(dbSubjectIDs);
    return;
  }

  let subject = subjects[subjectIDs.pop()];
  //handle the first subject remaining
  handleSubject(subject)
  .then( (dbSubjectID) => {
    //add that subject id to the dbSubjectIDs
    dbSubjectIDs = dbSubjectIDs.concat(dbSubjectID);

    //then handle the other subjectIDs
    handleSubjects(subjects, subjectIDs)
    .then( (dbIDs) => {
      //then add those subjectIDs to the dbSubjectIDs
      dbSubjectIDs = dbSubjectIDs.concat(dbIDs);
      //return our new dbSubjectIDs
      resolve(dbSubjectIDs);
    })
  })
});


const commitUnmJsonToDb = (jsonModel) => new Promise(
(resolve, reject) => {

  buildUnmJsonModel()
  .then((jsonModel) =>
  new Promise( (resolve, reject) => {
    console.log(jsonModel);
    let collapsedModel = collapseUnmJsonModel(jsonModel);
    let subjects = collapsedModel.subjects;
    handleSubjects(subjects)
    .then( (dbSubjectIDs) => {
      console.log(dbSubjectIDs);
      resolve(jsonModel);
    })
    .catch( (err) => {
      console.log(err)
    });
  }))
  .then( (jsonModel) => {
    console.log('finished');
    resolve(jsonModel);
  });

})

export default commitUnmJsonToDb
