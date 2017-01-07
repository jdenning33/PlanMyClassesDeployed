import React from 'react';
import Slider from 'react-slick'

const Carousel = (
  { elements,
    initialSlide = 0,
    afterChange } ) =>
{
  var settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    accessiblity: true,
    centerMode:true,
    focusOnSelect: true,
    initialSlide: initialSlide,
    draggable: true,
    swipeToSlide: true,
    afterChange: (e) => afterChange(e),
  };

  return (
    <Slider {...settings}>
      {elements}
    </Slider>
  );
}

export default Carousel
