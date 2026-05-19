import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createChats } from "../../../apiCalls/chat";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { setAllChats, setSelectedChat } from "../../../redux/userSlice";

const UserList = ({ searchKey }: { searchKey: string }) => {
  const allUsers = useSelector((state: any) => state.user.allUsers);
  const allChats = useSelector((state: any) => state.user.allChats);
  const currentUser = useSelector((state: any) => state.user.user);
  const selectedChats = useSelector((state: any) => state.user.selectedChat);

  const dispatch = useDispatch();

  const startNewChat = async (searchedUserId: any) => {
    try {
      dispatch(showLoader());
      const response = await createChats([currentUser._id, searchedUserId]);
      dispatch(hideLoader());

      if (response.success) {
        toast.success("Chat created successfully");
        const startChat = response.data;
        const updatedChat = [...allChats, startChat];

        dispatch(setAllChats(updatedChat));
        dispatch(setSelectedChat(startChat));
      } else {
        toast.error(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openChat = (searchedUserId: any) => {
    const chat = allChats.find(
      (chat: any) =>
        chat.members.map((m: any) => m._id).includes(currentUser._id) &&
        chat.members.map((m: any) => m._id).includes(searchedUserId),
    );

    if (chat) {
      dispatch(setSelectedChat(chat));
    }
  };

  const isSelectedChat = (user: any) =>
    selectedChats?.members?.map((m: any) => m._id).includes(user._id) || false;

  return (
    <>
      {allUsers
        ?.filter((users: any) => {
          return (
            (searchKey &&
              (users.firstName
                .toLowerCase()
                .includes(searchKey.toLowerCase()) ||
                users.lastName
                  .toLowerCase()
                  .includes(searchKey.toLowerCase()))) ||
            allChats.some((chat: any) =>
              chat.members.map((m: any) => m._id).includes(users._id),
            )
          );
        })
        .map((users: any) => {
          return (
            <div
              className="user-search-filter"
              key={users._id}
              onClick={() => openChat(users._id)}
            >
              <div
                className={
                  isSelectedChat(users) ? "selected-user" : "filtered-user"
                }
              >
                <div className="filter-user-display">
                  {users.profileImage ? (
                    <img
                      src={users.profileImage}
                      alt="Profile Pic"
                      className="user-profile-avatar"
                    />
                  ) : (
                    <div
                      className={
                        isSelectedChat(users)
                          ? "user-selected-avatar"
                          : "user-default-avatar"
                      }
                    >
                      {users.firstName.charAt(0).toUpperCase() +
                        users.lastName.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="filter-user-details">
                    <div
                      className={
                        isSelectedChat(users)
                          ? "user-selected-name"
                          : "user-display-name"
                      }
                    >
                      {users.firstName + " " + users.lastName}
                    </div>
                    <div
                      className={
                        isSelectedChat(users)
                          ? "user-selected-email"
                          : "user-display-email"
                      }
                    >
                      {users.email}
                    </div>
                  </div>

                  <div>
                    <div className="last-message-timestamp"></div>
                  </div>

                  {!allChats?.some((chat: any) =>
                    chat.members.map((m: any) => m._id).includes(users._id),
                  ) && (
                    <div className="user-start-chat">
                      <button
                        className="user-start-chat-btn"
                        onClick={() => {
                          startNewChat(users._id);
                        }}
                      >
                        Start Chat
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default UserList;
