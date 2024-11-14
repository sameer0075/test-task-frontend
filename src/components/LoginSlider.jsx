import React, { useRef } from "react";
import Slider from "react-slick";
import { SliderOne, SliderThree, SliderTwo } from "./../utils";

const LoginSlider = () => {
  const sliderRef = useRef(null);

  const settings = {
    className: "slider center",
    centerMode: true,
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    centerPadding: "80px",
    speed: 500,
    slidesToShow: 1,
    beforeChange: (oldIndex, newIndex) =>
      console.log("beforeChange", oldIndex, newIndex),
    afterChange: (newIndex) => console.log("afterChange", newIndex),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          centerPadding: "20px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          centerMode: false,
          centerPadding: "80px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="remarkable-component d-flex flex-column justify-content-between">
      <div>
        <div className="image-logo">
          <h1 className="logo-style">Logo</h1>
        </div>
        <div className="content-logo">
          <h1>Start your remarkable journey with us!</h1>
          <p>
            Our cold email automation helps you send personalized cold emails at
            scale with high email deliverability.
          </p>
        </div>
      </div>
      <div className="login-slider-padding">
        <Slider {...settings} ref={sliderRef}>
          <div className="clip">
            <img src={SliderOne} alt="Placeholder 1" />
          </div>
          <div className="clip">
            <img src={SliderTwo} alt="Placeholder 2" />
          </div>
          <div className="clip">
            <img src={SliderThree} alt="Placeholder 3" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default LoginSlider;
