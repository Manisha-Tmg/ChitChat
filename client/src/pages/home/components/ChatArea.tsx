import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import type { Socket } from "socket.io-client";
import { clearUnreadMessageCount } from "../../../apiCalls/chat";
import { createMessage, getAllMessages } from "../../../apiCalls/message";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import store from "../../../redux/store";

type Props = {
  socket: Socket;
};
const ChatArea = ({ socket }: Props) => {
  const selectedChats = useSelector((state: any) => state.user.selectedChat);
  const user = useSelector((state: any) => state.user.user);
  const allChat = useSelector((state: any) => state.user.allChats);
  const selectedUser = selectedChats?.members.find(
    (u: any) => u._id !== user._id,
  );

  const [message, setMessage] = useState<string>("");
  const [allMessages, setAllMessages] = useState<any[]>([]);

  const dispatch = useDispatch();
  const sendMessage = async () => {
    try {
      const msg: any = {
        chatId: selectedChats._id,
        text: message,
        sender: user._id,
      };
      socket.emit("send-msg", {
        ...msg,
        members: selectedChats.members.map((m: any) => m._id),
        read: false,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
      await createMessage(msg);
      setMessage("");
      // await getMessages();
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
  const clearUnreadMessage = async () => {
    try {
      dispatch(showLoader());
      const res = await clearUnreadMessageCount(selectedChats._id);

      if (res.success) {
        allChat.map((chat: any) => {
          if (chat._id === selectedChats._id) {
            return res.data;
          }
          return chat;
        });
      }

      dispatch(hideLoader());
    } catch (error: any) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getMessages();

    if (selectedChats?.lastMessage?.sender !== user._id) {
      clearUnreadMessage();
    }

    const handler = (data: any) => {
      const selectedChats = store.getState().user.selectedChat as any;

      if (selectedChats?._id === data.chatId) {
        setAllMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receive-msg", handler);

    // return () => {
    //   socket.off("receive-msg", handler);
    // };
  }, [selectedChats]);
  useEffect(() => {
    const msgContainer = document.getElementById("main-chat-area");
    if (msgContainer) {
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }
  }, [allMessages]);

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
      user.firstName?.at(0).toUpperCase() +
        user.firstName?.slice(1)?.toLowerCase() || "";
    let lName: string =
      user.lastName?.at(0).toUpperCase() +
        user.lastName?.slice(1).toLowerCase() || "";
    return fName + " " + lName;
  }
  return (
    <>
      {selectedChats && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">{formatName(selectedUser)}</div>
          <div className="main-chat-area" id="main-chat-area">
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
                      {isCurentUserSender && m.read && (
                        <i
                          className="fa fa-check-circle"
                          style={{ color: "#e74c3c" }}
                        />
                      )}
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
              onClick={sendMessage}
            ></button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
