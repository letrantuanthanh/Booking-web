import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./featured.css";

const Featured = () => {
  const hotelsData = useSelector((state) => state.hotels);

  const [hanoiProperties, setHanoiProperties] = useState([]);
  const [hcmProperties, setHcmProperties] = useState([]);
  const [danangProperties, setDanangProperties] = useState([]);

  useEffect(() => {
    setHanoiProperties(hotelsData.filter((item) => item?.city === "Ha Noi"));
    setHcmProperties(hotelsData.filter((item) => item?.city === "Ho Chi Minh"));
    setDanangProperties(hotelsData.filter((item) => item?.city === "Da Nang"));
  }, [hotelsData]);

  return (
    <div className="featured">
      <div className="featuredItem">
        <img src="./images/Ha Noi.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>{hanoiProperties?.length} properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img src="./images/HCM.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>{hcmProperties?.length} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="./images/Da Nang.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>{danangProperties?.length} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
