import { useState } from "react";
import { Link } from "react-router-dom";
import { signUpUser } from "../../apiCalls/Auth";
import "../signup/Style.css";
import toast from "react-hot-toast";

const Signup = () => {
  interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let response = null as any;
    try {
      response = await signUpUser(user);
      if (response.success) {
        toast.success(response?.message || "Error creating user");
      } else {
        toast.error(response?.message || "Error creating user");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error creating user");
    }
  };

  return (
    <div className="container">
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
        <div className="card_title">
          <h1>Create Account</h1>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="column">
              <input
                type="text"
                placeholder="First Name"
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Last Name"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>
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
            <button type="submit" onClick={handleSubmit}>
              Sign Up
            </button>
          </form>
        </div>
        <div className="card_terms">
          <span>
            Already have an account?
            <Link to="/login">Login Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
