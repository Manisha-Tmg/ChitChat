import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
};
const Header = ({ socket }: Props) => {
  const user = useSelector((state: any) => state.user.user);
  const navigate = useNavigate();

  function getFullName() {
    const fName: string =
      user?.firstName?.charAt(0).toUpperCase() +
        user?.firstName?.slice(1).toLowerCase() || "";
    const lName: string =
      user?.lastName?.charAt(0).toUpperCase() +
        user?.lastName?.slice(1).toLowerCase() || "";
    return fName + " " + lName;
  }

  function getInitial() {
    const fName: string = user?.firstName?.toUpperCase()[0] || "";
    const lName: string = user?.lastName?.toUpperCase()[0] || "";
    return fName + lName;
  }
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    socket.emit("user-offline", user._id);
  };
  return (
    <div className="app-header">
      <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
        Chit Chat
      </div>

      <div className="app-user-profile">
        {user?.profilePic && (
          <img
            src={user?.profilePic}
            alt="profile-pic"
            className="logged-user-profile-pic"
            onClick={() => navigate("/profile")}
          ></img>
        )}
        {!user?.profilePic && (
          <div
            className="logged-user-profile-pic"
            onClick={() => navigate("/profile")}
          >
            {getInitial()}
          </div>
        )}
        <div className="logged-user-name">{getFullName()}</div>
        <button className="logout-button" onClick={logout}>
          <i className="fa fa-power-off"></i>
        </button>
      </div>
    </div>
  );
};

export default Header;
