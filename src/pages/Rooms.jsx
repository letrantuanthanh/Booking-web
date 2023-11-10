import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./rooms.css";
const Rooms = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleAddnew = () => {
    navigate("/create-room");
  };

  const handleEdit = (id) => {
    navigate(`/edit-room/${id}`);
  };

  const fetchData = async () => {
    await fetch(`http://localhost:5000/admin/rooms`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      try {
        const response = await fetch(
          "http://localhost:5000/admin/delete-room",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              roomId: id,
            }),
          }
        );

        const res = await response.json();
        console.log(res);
        if (!response.ok) {
          alert(res.message);
          return;
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
    <div className="rooms-content">
      <div className="rooms-header">
        <p className="title">Rooms List</p>
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
              <div className="border-left"></div>Title
            </th>
            <th>
              <div className="border-left"></div>Description
            </th>
            <th>
              <div className="border-left"></div>Price
            </th>
            <th>
              <div className="border-left"></div>Max People
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
              <td>{item?.title}</td>
              <td>{item?.desc}</td>
              <td>{item?.price}</td>
              <td>{item?.maxPeople}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(item?._id)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteRoom(item?._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
        {/* <div className="pagination">
          <span>1-8 of 8</span>
          <AiOutlineLeft />
          <AiOutlineRight />
        </div> */}
      </div>
    </div>
  );
};

export default Rooms;
