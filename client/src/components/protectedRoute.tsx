import { useEffect, type ReactNode } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { getALlUser, getLoggedUser } from "../apiCalls/users";
import { hideLoader, showLoader } from "../redux/loaderSlice";
import { setAllChats, setAllUsers, setUser } from "../redux/userSlice";
import { getAllChats } from "../apiCalls/chat";

interface ProtectedRouteProps {
  children: ReactNode;
}
// type User = {
//   firstName: string;
//   lastName: string;
//   email: string;
// };

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: any) => state.user.user);
  const navigate: NavigateFunction = useNavigate();

  const dispatch = useDispatch();

  const getLoggedInUser = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getLoggedUser();
      dispatch(hideLoader());

      if (response.success) {
        dispatch(setUser(response.data));
        toast.success("User loaded");
      } else {
        toast.error(response.data);
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoader());
      navigate("/login");
    }
  };

  const getAllUser = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getALlUser();
      dispatch(hideLoader());

      if (response.success) {
        dispatch(setAllUsers(response.data));
        toast.success("User loaded");
      } else {
        toast.error(response.data);
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoader());
      navigate("/login");
    }
  };

  const getCurentUserChats = async () => {
    let response = null;
    try {
      response = await getAllChats();

      if (response.success) {
        dispatch(setAllChats(response.data));
        toast.success("User loaded");
      } else {
        toast.error(response.data);
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLoggedInUser();
      getAllUser();
      getCurentUserChats();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{children}</div>;
};

export default ProtectedRoute;
