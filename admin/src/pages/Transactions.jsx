import { BiSolidUserRectangle, BiSolidCart } from "react-icons/bi";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
// import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "./dashboard.css";
import { useEffect, useState } from "react";
import moment from "moment";

const Transactions = () => {
  const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);

  // const handleNextPage = () => {
  //   if (page === totalPages) {
  //     return;
  //   } else {
  //     setPage((prev) => prev + 1);
  //   }
  // };
  // const handlePrevPage = () => {
  //   if (page === 1) {
  //     return;
  //   } else {
  //     setPage(page - 1);
  //   }
  // };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:5000/admin/transactions`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="dashboard-wrapper">
      <div className="overall">
        <div className="item">
          <p className="title">USERS</p>
          <p className="value">100</p>
          <BiSolidUserRectangle />
        </div>
        <div className="item">
          <p className="title">ORDERS</p>
          <p className="value">100</p>
          <BiSolidCart />
        </div>
        <div className="item">
          <p className="title">EARNINGS</p>
          <p className="value">$ 100</p>
          <RiMoneyDollarBoxFill />
        </div>
        <div className="item">
          <p className="title">BALANCE</p>
          <p className="value">$ 100</p>
          <MdOutlineAccountBalanceWallet />
        </div>
      </div>
      <div className="content">
        <p className="title">Latest Transactions</p>
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
                <div className="border-left"></div>User
              </th>
              <th>
                <div className="border-left"></div>Hotel
              </th>
              <th>
                <div className="border-left"></div>Room
              </th>
              <th>
                <div className="border-left"></div>Date
              </th>
              <th>
                <div className="border-left"></div>Price
              </th>
              <th>
                <div className="border-left"></div>Payment Method
              </th>
              <th>
                <div className="border-left"></div>Status
              </th>
            </tr>
            {data?.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>
                  <input type="checkbox" />
                </td>
                <td>{item?._id}</td>
                <td>{item?.user}</td>
                <td>{item?.hotelName}</td>
                <td>{item?.room?.toString()}</td>
                <td>
                  {" "}
                  {moment(item?.dateStart).format("DD/MM/YYYY")} -{" "}
                  {moment(item?.dateEnd).format("DD/MM/YYYY")}
                </td>
                <td>{formatter.format(item?.price)}</td>
                <td>{item?.payment}</td>
                <td>{item?.status}</td>
              </tr>
            ))}
          </table>
          {/* <div className="pagination">
        <span>
          {page} - {page} of {totalPages}
        </span>
        <AiOutlineLeft onClick={handlePrevPage} />
        <AiOutlineRight onClick={handleNextPage} />
      </div> */}
        </div>
      </div>
    </div>
  );
};
export default Transactions;
