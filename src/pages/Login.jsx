import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./login.css";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validate = (data) => {
    let isValidated = true;
    if (!data.username) {
      isValidated = false;
      alert("Please enter username!");
      return isValidated;
    }

    if (!data.password) {
      isValidated = false;
      alert("Please enter password!");
      return isValidated;
    }

    return isValidated;
  };

  const handleLogin = async () => {
    const data = {
      username: username,
      password: password,
    };

    if (validate(data)) {
      try {
        const response = await fetch("http://localhost:5000/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const res = await response.json();

        if (!response.ok) {
          alert(res.message);
        } else {
          dispatch({ type: "ON_LOGIN", user: res });
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="auth-container">
        <h1>Admin Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default Login;
