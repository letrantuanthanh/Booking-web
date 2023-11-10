import { DateRange } from "react-date-range";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
const Booking = (props) => {
  const currentUser = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(currentUser.fullname);
  const [email, setEmail] = useState(currentUser.email);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [roomsData, setRoomsData] = useState([]);
  const [totalCheckedRooms, setTotalCheckedRooms] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  const navigate = useNavigate();

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const difTime = date[0].endDate.getTime() - date[0].startDate.getTime();

  const difDay = difTime / (1000 * 3600 * 24) + 1;

  const handleCheckBox = (value, dataRoom, room) => {
    let updatedArr;
    if (value) {
      updatedArr = [
        ...totalCheckedRooms,
        {
          id: dataRoom._id,
          room: room,
          price: dataRoom?.price,
        },
      ];
      setTotalCheckedRooms(updatedArr);
    } else {
      updatedArr = [...totalCheckedRooms];
      for (let i = 0; i < updatedArr?.length; i++) {
        if (
          updatedArr?.[i]?.id === dataRoom?._id &&
          updatedArr?.[i]?.room === room
        ) {
          updatedArr.splice(i, 1);
        }
      }
      setTotalCheckedRooms(updatedArr);
    }
  };

  const totalBill = useMemo(() => {
    let total = 0;
    for (let room of totalCheckedRooms) {
      total += room.price * difDay;
    }
    return total;
  }, [difDay, totalCheckedRooms]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  const validate = (data) => {
    let isValidated = true;

    if (!data.dateStart || !data.dateEnd) {
      isValidated = false;
      alert("Please choose your start day and end date!");
      return isValidated;
    }

    if (!data.username) {
      isValidated = false;
      alert("Please enter your user name!");
      return isValidated;
    }

    return isValidated;
  };
  const handleBooking = async () => {
    if (totalCheckedRooms.length === 0) {
      alert("Please choose your room number!");
      return;
    } else {
      const roomIds = totalCheckedRooms.map((item) => item?.id);
      const submitData = {
        username: currentUser.username,
        hotel: props.data?._id,
        room: totalCheckedRooms.map((item) => item.room),
        dateStart: date[0].startDate,
        dateEnd: date[0].endDate,
        price: totalBill,
        payment: paymentMethod,
        hotelName: props.data?.name,
        roomIds: roomIds.filter(
          (item, index) => roomIds.indexOf(item) === index
        ),
      };
      if (validate(submitData)) {
        try {
          const response = await fetch(
            "http://localhost:5000/create-transaction",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(submitData),
            }
          );

          const res = await response.json();

          if (!response.ok) {
            throw new Error("Error !!!");
          } else {
            navigate("/transactions");
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        return;
      }
    }
  };

  //fetch api
  const rooms = props.data?.rooms;
  const fetchRooms = async () => {
    if (rooms) {
      const responseRooms = await Promise.all(
        rooms?.map(async (room) => {
          const response = await fetch(`http://localhost:5000/room/${room}`);
          return await response.json();
        })
      );
      setRoomsData(responseRooms);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, [rooms]);

  return (
    <div className="booking-wrapper">
      <div className="date-info">
        <div className="date">
          <h2>Dates</h2>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className="date"
            minDate={new Date()}
          />
        </div>
        <div className="info">
          <h2>Reserve Info</h2>
          <span>Your Full Name:</span>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <span>Your Email:</span>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Your Phone Number:</span>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <span>Your Identity Card Number:</span>
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="rooms">
        <h2>Select Rooms</h2>
        <div className="room-container">
          {roomsData?.map((item, index) => (
            <div className="item" key={index}>
              <div className="room-info">
                <h3>{item?.title}</h3>
                <span>{item?.desc}</span>
                <span>Max people: {item?.maxPeople}</span>
                <span className="price">${item?.price}</span>
              </div>
              <div className="room-codes">
                {item?.roomNumbers?.map((room, i) => (
                  <div className="item" key={i}>
                    <span>{room}</span>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleCheckBox(e.target.checked, item, room)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="totals">
        <h2>Total Bill: {formatter.format(totalBill)}</h2>
        <div className="payment-wrapper">
          <select
            defaultValue="default"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="default" disabled>
              Select Payment Menthod
            </option>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
          </select>
          <button onClick={handleBooking}>Reserve Now</button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
