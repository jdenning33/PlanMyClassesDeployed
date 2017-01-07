// I'm not set up for this right now. Come back after the app is functional


// a card has a data id, and a card type
// a card type has a type field that should help decide where to find the data
//  and a value that will help decide the ordering of nested cards
//    value is out of 10, anything 8 or over should be displayed on
//    collapsed view
// A card handles one thing, however it may nest other cards
const CardTypes = {
  TITLE:        { type: 'title'       ,   value: 10 },
  DESCRIPTION:  { type: 'description' ,   value: 7  },
  SUBJECTS:     { type: 'subjects'    ,   value: 5  },
  COURSES:      { type: 'courses'     ,   value: 5  },
  SUBJECT:      { type: 'subject'     ,   value: 4  },
  COURSE:       { type: 'course'      ,   value: 4  },
}

// Notes:
//  _id: matches the cache id, matches the db id if it exists
//  type: is the card type
//  path: This is the path to get to this instance of the card
//        example: { subjectID: {courseID: 1} }
// This would mean the card would be expanded if (expandedCards.subjectID.courseID)
// data: Anything here will be stored in the dataBase
// Render: how to display the card
SubjectCard = {
  _id:  ...,
  type: CardTypes.SUBJECT,
  path: ...,
  data: {
    children: [
      { type:CardTypes.TITLE        ,  data:{text:'ECE: Electrical and ...'  } },
      { type:CardTypes.DESCRIPTION  ,  data:{text:'Baccelor program for ...' } },
      { type:CardTypes.COURSES      ,  data:{courses: ['1234asf1234123',
                                                       '1235lkqw634254',
                                                       ...
                                                       '2345qwern62352' ]     } }
    ],
  }

  render: () => {
    children.sort(child.type.value);
    children.map( (child) => Card.render(child) );
  }
}
