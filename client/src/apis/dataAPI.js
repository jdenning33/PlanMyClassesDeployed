import axios from 'axios';

// TODO: look into using dot-env store url in .env
const dataURL = 'https://planmyclasses2.herokuapp.com/api';
// const dataURL = 'http://localhost:3001/api';
export const COLLECTIONS_ENUM = {
  SUBJECTS:     { key:1, url:`${dataURL}/subjects`    },
  COURSES:      { key:2, url:`${dataURL}/courses`     },
  SECTIONS:     { key:3, url:`${dataURL}/sections`    },
  INSTRUCTORS:  { key:4, url:`${dataURL}/instructors` }
};

const dataAPI = {
  // request can be thought of as an Action passed to redux
  get: ( request ) => new Promise(
    (resolve, reject) => {
      if(request.dataID){
        axios.get(`${request.type.url}/${request.dataID}`)
        .then( res => {
          resolve(res.data);
        })
        .catch( err => console.error(err) );
      }else{
        axios.get(`${request.type.url}`)
        .then( res => {
          resolve(res.data);
        })
        .catch( err => console.error(err) );
      }
    }),

  // request needs a type (i.e. 'subject') and data to add
  add: ( request ) => new Promise(
    (resolve, reject) => {
      axios.post(request.type.url, request.data)
        .then( res => {
          resolve(res.data);
        })
        .catch( err => {
          console.error(err);
        });
    }),

  delete: ( request ) => new Promise(
    (resolve, reject) => {
      let url = (request.id)? `${request.type.url}/${request.id}` : request.type.url;
      axios.delete(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    }),

  update: ( request ) => new Promise(
    (resolve, reject) => {
      //sends the data id and new author/text to our api
      axios.put(`${request.type.url}/${request.id}`, request.data)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    })
}

export default dataAPI;
