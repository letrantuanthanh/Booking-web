import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newroom.css";

const NewRoom = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  const handleSetRooms = (value) => {
    const updatedArr = value.split(",").map((item) => Number(item));
    setRooms(updatedArr);
  };

  const validate = (data) => {
    let isValidated = true;
    if (!data.title) {
      isValidated = false;
      alert("Please enter title!");
      return isValidated;
    }
    if (!data.desc) {
      isValidated = false;
      alert("Please enter description!");
      return isValidated;
    }
    if (!data.price) {
      isValidated = false;
      alert("Please enter price!");
      return isValidated;
    }
    if (!data.maxPeople) {
      isValidated = false;
      alert("Please enter max people!");
      return isValidated;
    }

    if (!data.rooms) {
      isValidated = false;
      alert("Please enter room numbers!");
      return isValidated;
    }

    return isValidated;
  };

  const handleCreate = async () => {
    const data = {
      title: title,
      desc: desc,
      price: Number(price),
      rooms: rooms,
      maxPeople: Number(maxPeople),
    };
    if (validate(data)) {
      try {
        const response = await fetch(
          "http://localhost:5000/admin/create-room",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const res = await response.json();
        console.log(res);
        if (!response.ok) {
          throw new Error("Error !!!");
        } else {
          alert("Created Room!");
          navigate("/rooms");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/admin/hotels`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setHotels(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="product-wrapper">
      <div className="product-header">
        <p>Add New Room</p>
      </div>
      <div className="room-form">
        <div>
          <p>Title</p>
          <input
            type="text"
            placeholder="2 bed room"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <p>Description</p>
          <input
            type="text"
            placeholder="King size bed, 1 bathroom"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div>
          <p>Price</p>
          <input
            type="text"
            placeholder="100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <p>Max People</p>
          <input
            type="text"
            placeholder="2"
            value={maxPeople}
            onChange={(e) => setMaxPeople(e.target.value)}
          />
        </div>
      </div>
      <div className="footer-form">
        <div className="item">
          <p>Rooms</p>
          <textarea
            rows={3}
            value={rooms.toString()}
            onChange={(e) => handleSetRooms(e.target.value)}
          />
        </div>
        <div className="item">
          <p>Choose a hotel</p>
          <select>
            {hotels.map((item, index) => (
              <option key={index} value={item}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn-submit" onClick={handleCreate}>
          Send
        </button>
      </div>
    </div>
  );
};

export default NewRoom;
