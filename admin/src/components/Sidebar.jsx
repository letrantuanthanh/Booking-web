import classes from "./sidebar.module.css";
import { BiSolidDashboard, BiUser, BiSolidTruck } from "react-icons/bi";
import { FaHotel } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: "ON_LOGOUT" });
  };
  return (
    <div className={classes.sidebar}>
      <p className={classes.title}>MAIN</p>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navlink
        }
        end
      >
        <BiSolidDashboard />
        <span>Dashboard</span>
      </NavLink>
      <p className={classes.title}>LISTS</p>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navlink
        }
        end
      >
        <BiUser />
        <span>Users</span>
      </NavLink>
      <NavLink
        to="/hotels"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navlink
        }
        end
      >
        <FaHotel />
        <span>Hotels</span>
      </NavLink>
      <NavLink
        to="/rooms"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navlink
        }
        end
      >
        <MdBedroomParent />
        <span>Rooms</span>
      </NavLink>
      <NavLink
        to="/transactions"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navlink
        }
        end
      >
        <BiSolidTruck />
        <span>Transactions</span>
      </NavLink>
      <p className={classes.title}>NEW</p>
      <NavLink
        to="/create-hotel"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navlink
        }
        end
      >
        <FaHotel />
        <span>New Hotel</span>
      </NavLink>
      <NavLink
        to="/create-room"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navlink
        }
        end
      >
        <MdBedroomParent />
        <span>New Room</span>
      </NavLink>
      <p className={classes.title}>USER</p>
      <NavLink
        className={({ isActive }) =>
          isActive ? classes.active : classes.navlink
        }
        end
        onClick={handleLogout}
      >
        <RiLogoutBoxRLine />
        <span>Logout</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
