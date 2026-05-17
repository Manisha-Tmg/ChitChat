import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state: any) => state.user.user);

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
  return (
    <div className="app-header">
      <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
        Chit Chat
      </div>

      <div className="app-user-profile">
        <div className="logged-user-name">{getFullName()}</div>
        <div className="logged-user-profile-pic">{getInitial()}</div>
        <button className="logout-button">
          <i className="fa fa-power-off"></i>
        </button>
      </div>
    </div>
  );
};

export default Header;
