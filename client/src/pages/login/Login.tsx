import { Link } from "react-router-dom";
import "../signup/Style.css";
import { useState } from "react";
import { LoginUser } from "../../apiCalls/Auth";
import { toast } from "react-toastify";

const Login = () => {
  interface User {
    email: string;
    password: string;
  }
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const handleLogin = async (event: any) => {
    event.preventDefault();
    let data = null as any;
    try {
      data = await LoginUser(user);
      console.log(data);
      if (data.success) {
      }
      toast.success(data.message);
    } catch (error: any) {
      toast.error(data);
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
