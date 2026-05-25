import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createChats } from "../../../apiCalls/chat";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { setAllChats, setSelectedChat } from "../../../redux/userSlice";
import moment from "moment";

const UserList = ({ searchKey }: { searchKey: string }) => {
  const allUsers = useSelector((state: any) => state.user.allUsers);
  const allChat = useSelector((state: any) => state.user.allChats);
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
        const updatedChat = [...allChat, startChat];

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
    const chat = allChat.find(
      (chat: any) =>
        chat.members.map((m: any) => m._id).includes(currentUser._id) &&
        chat.members.map((m: any) => m._id).includes(searchedUserId),
    );

    if (chat) {
      dispatch(setSelectedChat(chat));
    }
  };

  const getLastMsg = (userId: any) => {
    const chat = allChat.find((chat: any) =>
      chat.members.map((m: any) => m._id).includes(userId),
    );
    if (!chat || !chat?.lastMessage) {
      return "";
    } else {
      const msgPrefix =
        chat?.lastMessage?.sender === currentUser._id ? "You: " : "";

      return msgPrefix + " " + chat.lastMessage?.text.substring(0, 25);
    }
  };

  const getLastMessageTimesStamp = (userId: any) => {
    const chat = allChat.find((chat: any) =>
      chat.members.map((m: any) => m._id).includes(userId),
    );

    if (!chat || !chat.lastMessage) return "";

    const messageDate = moment(chat.lastMessage.createdAt);

    if (messageDate.isSame(moment(), "day")) {
      return messageDate.format("hh:mm A");
    }

    if (messageDate.isSame(moment().subtract(1, "day"), "day")) {
      return "Yesterday";
    }

    return messageDate.format("DD/MM/YYYY");
  };

  function formatName(user: any) {
    let fName: string =
      user?.firstName?.at(0).toUpperCase() +
      user?.firstName?.slice(1)?.toLowerCase();
    let lName: string =
      user?.lastName.at(0).toUpperCase() +
      user?.lastName?.slice(1).toLowerCase();
    return fName + " " + lName;
  }

  const isSelectedChat = (user: any) =>
    selectedChats?.members?.map((m: any) => m._id).includes(user._id) || false;

  const getUnreadMessageCount = (userId: any) => {
    const chat = allChat.find((chat: any) =>
      chat.members.map((m: any) => m._id).includes(userId),
    );
    if (
      chat &&
      chat?.unreadMessageCount &&
      chat?.lastMessage?.sender !== currentUser._id
    ) {
      return (
        <div className="unread-message-counter">{chat.unreadMessageCount}</div>
      );
    } else {
      return "";
    }
  };

  function getData() {
    return searchKey === ""
      ? allChat
      : allUsers.filter(
          (user: any) =>
            user.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchKey.toLowerCase()),
        );
  }
  return (
    <>
      {getData()?.map((obj: any, index: number) => {
        let users = obj;
        if (obj.members) {
          users = obj.members.find((mem: any) => mem._id !== currentUser?._id);
        }

        return (
          <div
            className="user-search-filter"
            key={obj._id || `${users._id}-${index}`}
            onClick={() => openChat(users._id)}
          >
            <div
              className={
                isSelectedChat(users) ? "selected-user" : "filtered-user"
              }
            >
              <div className="filter-user-display">
                {users?.profileImage ? (
                  <img
                    src={users.profileImage}
                    alt="Profile Pic"
                    className="user-default-avatar"
                  />
                ) : (
                  <div
                    className={
                      isSelectedChat(users)
                        ? "user-selected-avatar"
                        : "user-default-avatar"
                    }
                  >
                    {users?.firstName?.charAt(0).toUpperCase() +
                      users?.lastName?.charAt(0).toUpperCase()}
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
                    {formatName(users)}
                  </div>
                  <div
                    className={
                      isSelectedChat(users)
                        ? "user-selected-email"
                        : "user-display-email"
                    }
                  >
                    {getLastMsg(users._id) || users.email}
                  </div>
                </div>

                <div>
                  {getUnreadMessageCount(users._id)}
                  <div className="last-message-timestamp">
                    {getLastMessageTimesStamp(users._id)}
                  </div>
                </div>

                {!allChat?.some((chat: any) =>
                  chat.members.map((m: any) => m._id).includes(users._id),
                ) && (
                  <div className="user-start-chat">
                    <button
                      className="user-start-chat-btn"
                      onClick={(e) => {
                        e.stopPropagation();
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
