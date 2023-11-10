import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./auth.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

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
    if (!data.fullname) {
      isValidated = false;
      alert("Please enter fullname!");
      return isValidated;
    }
    if (!data.phone) {
      isValidated = false;
      alert("Please enter phone!");
      return isValidated;
    }
    if (!data.email) {
      isValidated = false;
      alert("Please enter email!");
      return isValidated;
    }

    return isValidated;
  };

  const handleSubmit = async () => {
    const data = {
      username: username,
      password: password,
      fullname: fullname,
      phone: phone,
      email: email,
    };

    if (validate(data)) {
      try {
        const response = await fetch("http://localhost:5000/create-user", {
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
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <h1>Sign Up</h1>
        <span>User Name</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>Full Name</span>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <span>Phone</span>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <span>Email</span>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubmit}>Create Account</button>
      </div>
    </>
  );
};

export default SignUp;
