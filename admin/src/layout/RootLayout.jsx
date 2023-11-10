import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Login from "../pages/Login";

import "./root.css";

const RootLayout = () => {
  const isLogin = useSelector((state) => state.isLogin);

  return (
    <>
      {!isLogin && <Login />}
      {isLogin && (
        <div className="root-wrapper">
          <div className="header">
            <h2>Admin Page</h2>
          </div>
          <div className="content-wrapper">
            <Sidebar />
            <div className="content-page">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RootLayout;
