import { useState } from "react";
import "./login.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "http://localhost:3001/api/v1/users/login",
      { username, password }
    );
    setCookies("token", data.token);
    window.localStorage.setItem("userId", data.user._id);
    navigate("/");
  };

  return (
    <div className="box">
      <div className="left-box">
        <img src="./images/login.avif" alt="" />
      </div>
      <div className="right-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="loginUsername"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="loginPassword"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
