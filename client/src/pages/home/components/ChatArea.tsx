import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllMessages } from "../../../apiCalls/message";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { useEffect, useState } from "react";

const ChatArea = () => {
  const selectedChats = useSelector((state: any) => state.user.selectedChat);
  const user = useSelector((state: any) => state.user.user);
  const selectedUser = selectedChats?.members.find(
    (u: any) => u._id !== user._id,
  );

  const [message, setMessage] = useState<string>("");
  const [allMessages, setAllMessages] = useState<string[]>([]);

  const dispatch = useDispatch();
  const sendMessage = async () => {
    try {
      const msg: any = {
        chatId: selectedChats._id,
        text: message,
        sender: user._id,
      };
      dispatch(showLoader());
      await createMessage(msg);
      setMessage("");
      dispatch(hideLoader());
    } catch (error: any) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };

  const getMessages = async () => {
    try {
      dispatch(showLoader());
      const res = await getAllMessages(selectedChats._id);
      if (res.success) {
        setAllMessages(res.data);
      }
      dispatch(hideLoader());
    } catch (error: any) {
      dispatch(hideLoader());

      toast.error(error.message);
    }
  };

  useEffect(() => {
    getMessages();
  }, [selectedChats]);
  return (
    <>
      {selectedChats && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            {selectedUser.firstName + " " + selectedUser.lastName}
          </div>
          <div className="main-chat-area">CHAT AREA</div>
          <div className="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button
              className="fa fa-paper-plane send-message-btn"
              aria-hidden="true"
              onClick={sendMessage}
            ></button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
