import { useSelector } from "react-redux";

const UserList = ({ searchKey }: { searchKey: string }) => {
  const allUsers = useSelector((state: any) => state.user.allUsers);
  return (
    <>
      {allUsers?.map((users: any) => {
        return (
          <div className="user-search-filter">
            <div className="filtered-user">
              <div className="filter-user-display">
                {/* <img src={"img"} alt="Profile Pic" className="user-profile-image" /> */}
                <div className="user-default-avatar">
                  {users.firstName.charAt(0).toUpperCase() +
                    users.lastName.charAt(0).toUpperCase()}
                </div>
                <div className="filter-user-details">
                  <div className="user-display-name">
                    {users.firstName + users.lastName}
                  </div>
                  <div className="user-display-email">{users.email}</div>
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
      })}
    </>
  );
};

export default UserList;
