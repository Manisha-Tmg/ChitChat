import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
};
const Header = ({ socket }: Props) => {
  const users = useSelector((state: any) => state.user.user);
  const navigate = useNavigate();

  function getFullName() {
    const fName: string =
      users?.firstName?.charAt(0).toUpperCase() +
        users?.firstName?.slice(1).toLowerCase() || "";
    const lName: string =
      users?.lastName?.charAt(0).toUpperCase() +
        users?.lastName?.slice(1).toLowerCase() || "";
    return fName + " " + lName;
  }

  function getInitial() {
    const fName: string = users?.firstName?.toUpperCase()[0] || "";
    const lName: string = users?.lastName?.toUpperCase()[0] || "";
    return fName + lName;
  }
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    socket.emit("user-offline", users._id);
  };
  return (
    <div className="app-header">
      <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
        Chit Chat
      </div>

      <div className="app-user-profile">
        {users?.profileImage && (
          <img
            src={users?.profileImage}
            alt="profile-pic"
            className="logged-user-profile-pic"
            onClick={() => navigate("/profile")}
          ></img>
        )}
        {!users?.profileImage && (
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
