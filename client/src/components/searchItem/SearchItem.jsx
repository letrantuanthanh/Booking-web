import { useNavigate } from "react-router-dom";
import "./searchItem.css";

const SearchItem = (data) => {
  const navigate = useNavigate();
  const handleBooking = (id) => {
    navigate(`/hotels/${id}`);
  };
  return (
    <div className="searchItem">
      <img src={data?.data?.photos?.[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{data?.data?.name}</h1>
        <span className="siDistance">{data?.data?.distance} from center</span>
        <span className="siTaxiOp">{data?.data?.tag}</span>
        <span className="siSubtitle">{data?.data?.desc}</span>
        <span className="siFeatures">{data?.data?.type}</span>
        {/* If can cancel */}
        {data?.data?.free_cancel ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{data?.data?.rate_text}</span>
          <button>{data?.data?.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${data?.data?.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button
            className="siCheckButton"
            onClick={() => handleBooking(data?.data?._id)}
          >
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
