import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token"]);

  const logout = () => {
    setCookies("token", "");
    window.localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <>
      <nav id="top-nav">
        <div className="left-nav">
          <a href="">Ship to 632014</a>
          <a href="">Vellore, Tamil Nadu</a>
        </div>
        <div className="right-nav">
          <a href="">Registry</a>
          <a href="">Weekly Ad</a>
          <a href="">RedCard</a>
          <a href="">Find Stores</a>
        </div>
      </nav>
      <nav id="bottom-nav">
        <a onClick={() => navigate("/")}>
          <img src="images/RainFork-Logo.png" id="logo" alt="f4" />
        </a>
        <a href="">Categories</a>
        <a href="">Deals</a>
        <a href="">New & Featured</a>
        <a href="">Pickup & Delivery</a>
        <div id="search-box">
          <input type="text" placeholder="What can we help you find?" />
          <button>Search</button>
        </div>
        <div className="sign-in">
          {!cookies.token ? (
            <a onClick={() => navigate("/login")}>Login</a>
          ) : (
            <a onClick={logout}>Logout</a>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
