import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./hotels.css";
const Hotels = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleAddnew = () => {
    navigate("/create-hotel");
  };

  const fetchData = async () => {
    await fetch(`http://localhost:5000/admin/hotels`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    navigate(`/edit-hotel/${id}`);
  };

  const handleDeleteHotel = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      try {
        const response = await fetch(
          "http://localhost:5000/admin/delete-hotel",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              hotelId: id,
            }),
          }
        );

        const res = await response.json();
        console.log(res);
        if (!response.ok) {
          alert(res.message);
        } else {
          fetchData();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="hotels-content">
      <div className="hotels-header">
        <p className="title">Hotels List</p>
        <button onClick={handleAddnew}>Add New</button>
      </div>
      <div className="table">
        <table>
          <tr className="first-row">
            <th style={{ textAlign: "center" }}>
              <input type="checkbox" />
            </th>
            <th>
              <div className="border-left"></div>ID
            </th>
            <th>
              <div className="border-left"></div>Name
            </th>
            <th>
              <div className="border-left"></div>Type
            </th>
            <th>
              <div className="border-left"></div>Title
            </th>
            <th>
              <div className="border-left"></div>City
            </th>
            <th>
              <div className="border-left"></div>Action
            </th>
          </tr>
          {data?.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: "center" }}>
                <input type="checkbox" />
              </td>
              <td>{item?._id}</td>
              <td>{item?.name}</td>
              <td>{item?.type}</td>
              <td>{item?.title}</td>
              <td>{item?.city}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(item?._id)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteHotel(item?._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Hotels;
