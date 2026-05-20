import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllMessages } from "../../../apiCalls/message";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { useEffect, useState } from "react";
import moment from "moment";

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

  const formatTime = (timeStamp: string) => {
    const messageTime = moment(timeStamp);
    const now = moment();

    if (now.isSame(messageTime, "day")) {
      return `Today ${messageTime.format("hh:mm A")}`;
    }

    if (now.clone().subtract(1, "day").isSame(messageTime, "day")) {
      return `Yesterday ${messageTime.format("hh:mm A")}`;
    }

    return messageTime.format("MMM D, YYYY hh:mm A");
  };

  function formatName(user: any) {
    let fName: string =
      user.firstName.at(0).toUpperCase() +
      user.firstName.slice(1)?.toLowerCase();
    let lName: string =
      user.lastName.at(0).toUpperCase() + user.lastName?.slice(1).toLowerCase();
    return fName + " " + lName;
  }
  return (
    <>
      {selectedChats && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">{formatName(selectedUser)}</div>
          <div className="main-chat-area">
            {allMessages.map((m: any, i: any) => {
              const isCurentUserSender = m.sender === user._id;
              return (
                <div
                  className="message-container"
                  key={i}
                  style={
                    isCurentUserSender
                      ? { justifyContent: "flex-end" }
                      : { justifyContent: "flex-start" }
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: isCurentUserSender
                        ? "flex-end"
                        : "flex-start",
                    }}
                  >
                    <div
                      className={
                        isCurentUserSender ? "send-message" : "received-message"
                      }
                    >
                      {m.text}
                    </div>

                    <div className="message-timestamp">
                      {formatTime(m.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
