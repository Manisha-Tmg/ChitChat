import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate, type NavigateFunction } from "react-router-dom";
import { LoginUser } from "../../apiCalls/Auth";
import { hideLoader, showLoader } from "../../redux/loaderSlice";
import "../signup/Style.css";

const Login = () => {
  const dispatch = useDispatch();
  interface User {
    email: string;
    password: string;
  }
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const navigate: NavigateFunction = useNavigate();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    let data = null as any;
    try {
      dispatch(showLoader());
      data = await LoginUser(user);
      dispatch(hideLoader());
      const token: string = data.data.token;
      if (data.success) {
        localStorage.setItem("token", token);
        navigate("/");
        toast.success(data?.message);
      } else {
        toast.error(data?.message || "Login failed");
      }
    } catch (error: any) {
      dispatch(hideLoader());
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
        <div className="card_title">
          <h1>Login Here</h1>
        </div>
        <div className="form">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button>Login</button>
          </form>
        </div>
        <div className="card_terms">
          <span>
            Don't have an account yet?
            <Link to="/signup">Signup Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
