import { useSelector, useDispatch } from "react-redux";

import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import Login from "../auth/Login";
import "./home.css";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.isLogin);

  useEffect(() => {
    fetch("http://localhost:5000/hotels")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_HOTELS", hotels: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {!isLogin && <Login />}
      {isLogin && (
        <>
          <Navbar />
          <Header />
          <div className="homeContainer">
            <Featured />
            <h1 className="homeTitle">Browse by property type</h1>
            <PropertyList />
            <h1 className="homeTitle">Homes guests love</h1>
            <FeaturedProperties />
            <MailList />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
