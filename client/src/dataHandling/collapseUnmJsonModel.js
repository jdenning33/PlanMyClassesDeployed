
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
      subjectModel.courses[courseKey].campusi.push(campusModel.code);
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
      unmModel.subjects[subjectKey].campusi.push(campusModel.code);
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
      newModel.campusi.push(campusKey);
      handleSubjects(newModel, oldSemesterModel.campusi[campusKey]);
    });

    // newModel.semesters[semesterKey] = newSemesterModel;
  });
  return newModel;
}

export default collapseUnmJsonModel
