import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./newhotel.css";

const EditHotel = () => {
  const params = useParams();
  const [roomsData, setRoomsData] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [featured, setFeatured] = useState(true);
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  const handleSetImages = (value) => {
    setImages(value.split("\n"));
  };

  const handleSetValueRooms = (value) => {
    let updatedArr = [...rooms];
    if (updatedArr.includes(value)) {
      updatedArr = updatedArr.filter((item) => item !== value);
      console.log();
    } else {
      updatedArr = [...updatedArr, value];
    }
    setRooms(updatedArr);
  };

  const handleEdit = async () => {
    const data = {
      hotelId: params.id,
      name: name,
      type: type,
      city: city,
      title: title,
      address: address,
      distance: distance,
      photos: images,
      desc: desc,
      price: price,
      rooms: rooms,
      rating: 10,
    };
    try {
      const response = await fetch("http://localhost:5000/admin/edit-hotel", {
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
        alert("Edit Hotel!");
        navigate("/hotels");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRooms = async () => {
    await fetch(`http://localhost:5000/admin/rooms`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRoomsData(data);
        // setRooms(data.map((item) => item?.title).join("\n"));
      })
      .catch((err) => console.log(err));
  };

  const fetchHotelData = async () => {
    await fetch(`http://localhost:5000/admin/edit-hotel/${params.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // setRoomsData
        setName(data.name);
        setType(data.type);
        setCity(data.city);
        setDistance(data.city);
        setDesc(data.desc);
        setPrice(data.cheapestPrice);
        setTitle(data.title);
        setAddress(data.address);
        setImages(data.photos);
        setRooms(data.rooms);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchHotelData();
    fetchRooms();
  }, []);

  return (
    <div className="product-wrapper">
      <div className="product-header">
        <p>Edit Product</p>
      </div>
      <div className="form">
        <div>
          <p>Name</p>
          <input
            type="text"
            placeholder="My Hotel"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <p>Type</p>
          <input
            type="text"
            placeholder="hotel"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div>
          <p>City</p>
          <input
            type="text"
            placeholder="New York"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <p>Address</p>
          <input
            type="text"
            placeholder="elton st,216"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <p>Distance from City Center</p>
          <input
            type="text"
            placeholder="500"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>
        <div>
          <p>Title</p>
          <input
            type="text"
            placeholder="The best Hotel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <p>Description</p>
          <input
            type="text"
            placeholder="description"
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
          <p>Images</p>
          <textarea
            rows={6}
            value={images?.join("\n")}
            onChange={(e) => handleSetImages(e.target.value)}
          />
        </div>
        <div>
          <p>Featured</p>
          <select
            value={featured}
            onChange={(e) => setFeatured(e.target.value)}
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>

        <div className="hotel-room">
          <p>Room Ids</p>
          <select multiple>
            {roomsData.map((item, index) => (
              <option
                value={item?._id}
                key={index}
                onClick={(e) => handleSetValueRooms(e.target.value)}
                selected={rooms.includes(item?._id) ? true : false}
              >
                {item?.title}
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

export default EditHotel;
