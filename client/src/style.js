//style.js
const style = {
  addButtonContainer: {
    display: 'inline-block',
    border: '10px',
    margin: 'auto',
    padding: '0px',
    position: 'absolute',
    overflow: 'visible',
    width: '48px',
    height: '48px',
    top: '0px',
    bottom: '0px',
    right: '4px',
    background: 'none'
  },
  addButton: {

  },
  orIcon: {
    float:'right',
    // height:'35px',
    width:'100%',
    marginTop: '-30px',
    // marginBottom: '-18px',
    textAlign: 'center',
  },
  searchBarContainer: {
    textAlign: 'center',
    position: 'fixed',
    bottom: '56px',
    left: '0px',
    // marginLeft:'-8px',  //offset the boddy padding
    width: '100vw',
  },
  searchBar: {
    textAlign: 'center',
    margin: '0 auto',
    width:'100%',
  },
  chip: {
    float: 'right',
    margin: '0 4px',
  },
  chipLabel: {
    fontSize: '10px',
  },
  wrapper: {
    display: 'flex',
    width: '100%',
    padding: '0 16px',
    flexWrap: 'wrap',
  },
  header:{
    position:'fixed',
    top:'0px',
    left: '0px',
    zIndex: '100',
    margin: '0 auto',
    width: '100vw',
    textAlign: 'center',
  },
  appPage:{
    margin: '0 auto',
    marginTop: '70px',
    marginBottom: '100px',
    padding: '1px',
    width: '100%',
    minWidth: '300px',
    maxWidth: '500px',

    overflowX: 'hidden !important',
  },
  footer: {
    position:'fixed',
    bottom:'0px',
    left: '0px',
    zIndex: '100',
    margin: '0 auto',
    width: '100vw',
    textAlign: 'center',
  },

  addCourse: {
    width:'100%',
    textAlign: 'center',
  },

  carousel: {
    minWidth:'150px',
    maxWidth:'300px',
    margin:'0 auto',
    backgroundColor:'#aaaaaa'
  },



  sectionCarouselPaper: {
    padding: '2px',
    textAlign: 'center',
    backgroundColor:'#F8BBD0',
  },
  sectionActiveCarouselPaper: {
    padding: '7px',
    textAlign: 'center',
    backgroundColor:'#4DD0E1',
  },
  timeCarouselPaper: {
    padding: '2px',
    textAlign: 'center',
    backgroundColor:'#FCE4EC',
  },
  timeActiveCarouselPaper: {
    padding: '7px',
    textAlign: 'center',
    backgroundColor:'#80DEEA',
  },
  courseCarouselPaper: {
    padding: '2px',
    textAlign: 'center',
    backgroundColor:'#FCE4EC',
  },
  courseActiveCarouselPaper: {
    padding: '7px',
    textAlign: 'center',
    backgroundColor:'#80DEEA',
  },
  carouselItem: {
    display: 'inline-block',
    width:'auto',
    margin: '5px 0px',      //active padding - regular padding
    textAlign:'bottom',
  },
  activeCarouselItem: {
    display: 'inline-block',
    width:'auto',
    paddingBottom:'1px',
    margin: '0px 3px',
    textAlign:'center',
  },
  courseCarousel: {
    margin: '0 auto',
    width: '70%',
    padding: '0px',
  },
  primaryTimeCarousel: {
    margin: '0 auto',
    width: '70%',
    padding: '0px',
  },
  sectionCarousel: {
    margin: '0 auto',
    padding: '0px',
  },
  courseStack: {
    padding: '5px 0px',
    width: '80%',
    minWidth: '300px',
    maxWidth: '600px',
    margin: '0 auto',
    marginBottom: '5px',
  },
  scheduleStackCard: {

  },
  scheduleBuilder: {
    minWidth:'200px',
    maxWidth:'400px',
    margin:'0 auto',
    padding: '50px',
    backgroundColor:'#dddddd'
  },
  // courseBrowserCard: {
  //   paddingTop: '1px',
  //   paddingRight: '1px',
  // },
  sectionCardTime: {
    float: 'right',
  },
  scheduleBuilderSub: {
    minWidth:'200px',
    maxWidth:'400px',
    margin:'0 auto',
    marginBottom:'10px',
    padding:'15px',
    fontFamily:'Helvetica, sans-serif',
    backgroundColor:'#bbbbff'
  },
  title: {
    margin:'0 auto',
    textAlign:'center',
    fontWeight: 'bold',
  },


}

module.exports = style;
