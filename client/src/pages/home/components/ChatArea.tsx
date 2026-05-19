import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../../apiCalls/message";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { useState } from "react";

const ChatArea = () => {
  const selectedChats = useSelector((state: any) => state.user.selectedChat);
  const user = useSelector((state: any) => state.user.user);
  const selectedUser = selectedChats?.members.find(
    (u: any) => u._id !== user._id,
  );

  const [message, setMessage] = useState();

  const dispatch = useDispatch();
  const sendMessage = async () => {
    try {
      const msg: any = {
        chat: selectedChats._id,
        sender: user._id,
        text: message,
      };
      dispatch(showLoader());
      const res = await createMessage(msg);
      dispatch(hideLoader());
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {selectedChats && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            {selectedUser.firstName + " " + selectedUser.lastName}
          </div>
          <div>CHAT AREA</div>
          <div className="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
            />
            <i
              className="fa fa-paper-plane send-message-btn"
              aria-hidden="true"
            ></i>
          </div>
          <div>SEND MESSAGE</div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
