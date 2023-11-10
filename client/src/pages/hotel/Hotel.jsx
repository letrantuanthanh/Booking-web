import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Booking from "./booking";

const Hotel = () => {
  const [dataDetail, setDataDetail] = useState({});
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const params = useParams();

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleBooking = () => {
    setIsBooking(!isBooking);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber =
        slideNumber === 0 ? dataDetail?.photos?.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber === dataDetail?.photos?.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/hotel-detail/${params.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setDataDetail(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img
                src={dataDetail?.photos?.[slideNumber]}
                alt=""
                className="sliderImg"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleBooking}>
            Reserve or Book Now!
          </button>
          <h1 className="hotelTitle">{dataDetail?.title}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{dataDetail?.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {dataDetail?.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${dataDetail?.cheapestPrice} at this property and
            get a free airport taxi
          </span>
          <div className="hotelImages">
            {dataDetail?.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{dataDetail?.name}</h1>
              <p className="hotelDesc">{dataDetail?.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              {/* <h1>Perfect for a 9-night stay!</h1> */}
              {/* <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span> */}
              <h2>
                <b>${dataDetail?.cheapestPrice}</b> (1 nights)
              </h2>
              <button onClick={handleBooking}>Reserve or Book Now!</button>
            </div>
          </div>
          <div className={isBooking ? "" : "hide"}>
            <Booking data={dataDetail} />
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
