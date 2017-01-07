//style.js
const style = {
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
    margin: '0 auto',
    width:'100%',
  },
  window: {
    height: '98%',
    width: '98%',
    // minHeight: '100vh',
    // minWidth: '100vw',
    display: 'flex',
  },
  contentHiderLeft: {
    flex:'1 1',
    zIndex:'99',
    backgroundColor: '#fff',
    marginRight: '2px',
    marginLeft: '-15px',
    marginTop: '-10px',
  },
  contentHiderRight : {
    flex:'1 1',
    zIndex:'99',
    backgroundColor: '#fff',
    marginLeft: '2px',
    marginRight: '-25px',
    marginTop: '-10px',
  },
  chip: {
    margin: '0 4px',
  },
  chipLabel: {
    fontSize: '10px',
  },
  wrapper: {
    display: 'flex',
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
    marginBottom: '80px',
    padding: '0px',
    width: '100%',
    minWidth: '300px',
    maxWidth: '500px',

    minHeight: '100vh',
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



  courseCarouselPaper: {
    padding: '2px',
    textAlign: 'center',
    backgroundColor:'#F8BBD0',
  },
  courseActiveCarouselPaper: {
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
  sectionCarouselPaper: {
    padding: '2px',
    textAlign: 'center',
    backgroundColor:'#FCE4EC',
  },
  sectionActiveCarouselPaper: {
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
  carouselCard:{
    backgroundColor:'#4DD0E1',
  },
  activeCarouselCard:{
    backgroundColor:'#F06292',
  },
  courseCarousel: {
    margin: '0 auto',
    padding: '0px',
  },
  primaryTimeCarousel: {
    margin: '0 auto',
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
  courseBrowserCard: {
    paddingTop: '1px',
    paddingRight: '1px',
  },
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
