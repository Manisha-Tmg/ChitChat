import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { getLoggedUser } from "../apiCalls/users";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: ReactNode;
}
type User = {
  firstName: string;
  lastName: string;
  email: string;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate: NavigateFunction = useNavigate();

  const getLoggedInUser = async () => {
    let response = null;
    try {
      response = await getLoggedUser();
      if (response.success) {
        setUser(response.data);
        toast.success("User loaded");
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLoggedInUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <p>
        Name: {user?.firstName} {user?.lastName}
      </p>
      <p>Email:{user?.email}</p>
      {children}
    </>
  );
};

export default ProtectedRoute;
