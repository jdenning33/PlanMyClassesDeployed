
const handleSections = (courseModel, campusModel) => {
  // console.log(subjectModel, campusModel);
  Object.keys(campusModel.subjects[courseModel.subject].courses[courseModel.number].sections)
  .forEach( (sectionKey) => {
    let oldCourseModel = campusModel.subjects[courseModel.subject]
                        .courses[courseModel.number].sections[sectionKey];

    courseModel.sections[sectionKey] = oldCourseModel;
    courseModel.sections[sectionKey].campus = campusModel.code;
    courseModel.sections[sectionKey].semester = campusModel.semester;
  });

  return courseModel;
}



const handleCourses = (subjectModel, campusModel) => {
  // console.log(subjectModel, campusModel);
  Object.keys(campusModel.subjects[subjectModel.code].courses)
  .forEach( (courseKey) => {
    let oldCourseModel = campusModel.subjects[subjectModel.code].courses[courseKey];

    if(subjectModel.courses[courseKey]){
      if(!subjectModel.courses[courseKey].campusi.some(campus =>
        campus === campusModel.code)){
        subjectModel.courses[courseKey].campusi.push(campusModel.code);
      }
      if(!subjectModel.courses[courseKey].semesters.some(semester =>
        semester === campusModel.semester)){
        subjectModel.courses[courseKey].semesters.push(campusModel.semester);
      }
    }else{
      subjectModel.courses[courseKey] = { title: oldCourseModel.title,
                                          number: oldCourseModel.number,
                                          subject: oldCourseModel.subject,
                                          sections: {},
                                          campusi: [campusModel.code],
                                          semesters: [campusModel.semester]
                                        };
    }
    handleSections(subjectModel.courses[courseKey], campusModel);
  });

  return subjectModel;
}


const handleSubjects = (unmModel, campusModel) => {

  Object.keys(campusModel.subjects).forEach( (subjectKey) => {
    let oldSubjectModel = campusModel.subjects[subjectKey];

    if(unmModel.subjects[subjectKey]){
      if(!unmModel.subjects[subjectKey].campusi.some(campus =>
        campus === campusModel.code)){
        unmModel.subjects[subjectKey].campusi.push(campusModel.code);
      }
      if(!unmModel.subjects[subjectKey].semesters.some(semester =>
        semester === campusModel.semester)){
        unmModel.subjects[subjectKey].semesters.push(campusModel.semester);
      }
    }else{
      unmModel.subjects[subjectKey] = {  name: oldSubjectModel.name,
                                          code: oldSubjectModel.code,
                                          courses: {},
                                          campusi: [campusModel.code],
                                          semesters: [campusModel.semester]
                                        };
    }

    handleCourses(unmModel.subjects[subjectKey], campusModel);
  });

  return unmModel;
}


const collapseUnmJsonModel = (jsonModel) => {

  let newModel = { campusi: [],
                   semesters: [],
                   subjects: {}
                 };

  Object.keys(jsonModel).forEach( (semesterKey) => {

    let oldSemesterModel = jsonModel[semesterKey];
    newModel.semesters.push(semesterKey);

    Object.keys(oldSemesterModel.campusi).forEach( (campusKey) => {
      let campusModel = oldSemesterModel.campusi[campusKey];

      if(!newModel.campusi.some(campus =>
        campus === campusModel.code)){
          newModel.campusi.push(campusKey);
      }

      handleSubjects(newModel, campusModel);
    });

    // newModel.semesters[semesterKey] = newSemesterModel;
  });
  return newModel;
}

export default collapseUnmJsonModel
