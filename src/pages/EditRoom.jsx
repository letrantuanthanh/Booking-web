import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./newroom.css";

const EditRoom = () => {
  const params = useParams();
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

  const handleEdit = async () => {
    const data = {
      roomId: params.id,
      title: title,
      desc: desc,
      price: Number(price),
      rooms: rooms,
      maxPeople: Number(maxPeople),
    };
    try {
      const response = await fetch("http://localhost:5000/admin/edit-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
      if (!response.ok) {
        throw new Error("Error !!!");
      } else {
        alert("Edit Room!");
        navigate("/rooms");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHotels = async () => {
    await fetch(`http://localhost:5000/admin/hotels`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setHotels(data);
      })
      .catch((err) => console.log(err));
  };
  const fetchRoomData = async () => {
    await fetch(`http://localhost:5000/admin/edit-room/${params.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setDesc(data.desc);
        setPrice(data.price);
        setTitle(data.title);
        setMaxPeople(data.maxPeople);
        setRooms(data.roomNumbers);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchHotels();
    fetchRoomData();
  }, []);
  console.log(params.id);

  return (
    <div className="product-wrapper">
      <div className="product-header">
        <p>Edit Room</p>
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
        <button className="btn-submit" onClick={handleEdit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default EditRoom;
