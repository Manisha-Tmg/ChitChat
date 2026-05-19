import { useSelector } from "react-redux";

const ChatArea = () => {
  const selectedChats = useSelector((state: any) => state.user.selectedChat);
  const user = useSelector((state: any) => state.user.user);
  const selectedUser = selectedChats?.members.find(
    (u: any) => u._id !== user._id,
  );
  return (
    <>
      {selectedChats && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            {selectedUser.firstName + " " + selectedUser.lastName}
          </div>
          <div>CHAT AREA</div>
          <div>SEND MESSAGE</div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
