import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.isLogin);
  const user = useSelector((state) => state.user);

  const moveToLogin = () => {
    navigate("/login");
  };

  const moveToSignUp = () => {
    navigate("/signup");
  };

  const showTransactions = () => {
    navigate("/transactions");
  };

  const handleLogout = () => {
    dispatch({ type: "ON_LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Booking Website</span>
        <div className="navItems">
          {!isLogin && (
            <>
              <button className="navButton" onClick={moveToSignUp}>
                Register
              </button>
              <button className="navButton" onClick={moveToLogin}>
                Login
              </button>
            </>
          )}
          {isLogin && (
            <>
              <>
                <span>{user?.fullname}</span>
                <button className="navButton" onClick={showTransactions}>
                  Transactions
                </button>
                <button className="navButton" onClick={handleLogout}>
                  Logout
                </button>
              </>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
