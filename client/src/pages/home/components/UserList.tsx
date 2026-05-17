import "./../../css/Home.css";

const UserList = () => {
  return (
    <div className="user-search-filter">
      <div className="filtered-user">
        <div className="filter-user-display">
          {/* <img src={"img"} alt="Profile Pic" className="user-profile-image" /> */}

          <div className="filter-user-details">
            <div className="user-display-name">Mary Jane</div>
            <div className="user-display-email">mary@gmail.com</div>
          </div>
          <div>
            <div className="last-message-timestamp"></div>
          </div>

          <div className="user-start-chat">
            <button className="user-start-chat-btn">Start Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
