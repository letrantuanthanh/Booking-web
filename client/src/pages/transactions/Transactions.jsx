import { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./transactions.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const Transactions = () => {
  const user = useSelector((state) => state.user);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/transactions/${user.username}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setTransactions(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return (
    <>
      <Navbar />
      <div className="transactions-wrapper">
        <h2>Your Transactions</h2>
        <table>
          <tr className="title">
            <th>#</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
          {transactions.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item?.hotelName}</td>
              <td>{item?.room?.toString()}</td>
              <td>
                {moment(item?.dateStart).format("DD/MM/YYYY")} -{" "}
                {moment(item?.dateEnd).format("DD/MM/YYYY")}
              </td>
              <td>{formatter.format(item?.price)}</td>
              <td>{item?.payment}</td>
              <td>{item?.status}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default Transactions;
