import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import type { Socket } from "socket.io-client";
import { clearUnreadMessageCount } from "../../../apiCalls/chat";
import { createMessage, getAllMessages } from "../../../apiCalls/message";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import store from "../../../redux/store";
import { setAllChats } from "../../../redux/userSlice";
import EmojiPicker from "emoji-picker-react";

type Props = {
  socket: Socket;
};

type Message = {
  _id: string;
  sender: string;
  chatId: string;
  text: string;
  image?: string;
  read: boolean;
  createdAt: string;
};

const ChatArea = ({ socket }: Props) => {
  const selectedChats = useSelector((state: any) => state.user.selectedChat);
  const user = useSelector((state: any) => state.user.user);
  const allChat = useSelector((state: any) => state.user.allChats);

  const selectedUser = selectedChats?.members.find(
    (u: any) => u._id !== user._id,
  );

  const [message, setMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const dispatch = useDispatch();

  const sendMessage = async (image: any) => {
    try {
      if (!selectedChats?._id) return;
      if (!message && !image) return;

      const msg: any = {
        chatId: selectedChats._id,
        text: message,
        sender: user._id,
        image: image,
      };

      socket.emit("send-msg", {
        ...msg,
        members: selectedChats.members.map((m: any) => m._id),
        read: false,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      });

      await createMessage(msg);

      setMessage(""); // FIX
    } catch (error: any) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };

  const getMessages = async () => {
    try {
      if (!selectedChats?._id) return;

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
      if (!selectedChats?._id) return;

      socket.emit("clear-unread-msg", {
        chatId: selectedChats._id,
        members: selectedChats.members.map((m: any) => m._id),
      });

      dispatch(showLoader());

      const res = await clearUnreadMessageCount(selectedChats._id);

      if (res.success) {
        const updatedChats = allChat.map((chat: any) => {
          if (chat._id === selectedChats._id) {
            return res.data;
          }
          return chat;
        });

        dispatch(setAllChats(updatedChats));
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

    const handler = (message: Message) => {
      const selectedChats = store.getState().user.selectedChat as any;

      if (selectedChats?._id === message.chatId) {
        setAllMessages((prev) => [...prev, message]);
      }

      if (
        selectedChats?._id === message.chatId &&
        message.sender !== user._id
      ) {
        clearUnreadMessage();
      }
    };

    socket.on("receive-msg", handler);

    socket.on("msg-count-clear", (data) => {
      const selectedChats = store.getState().user.selectedChat as any;
      const allChat = store.getState().user.allChats as any[];

      if (selectedChats?._id === data.chatId) {
        const updatedchats = allChat.map((chat) => {
          if (chat?._id === data.chatId) {
            return { ...chat, unreadMessageCount: 0 };
          }
          return chat;
        });

        dispatch(setAllChats(updatedchats));

        setAllMessages((preMsg) =>
          preMsg.map((msg) => ({ ...msg, read: true })),
        );
      }
    });

    socket.on("started-typing", (data) => {
      if (selectedChats?._id === data.chatId && data.sender !== user._id) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
      }
    });

    return () => {
      socket.off("receive-msg", handler);
      socket.off("msg-count-clear");
      socket.off("started-typing");
    };
  }, [selectedChats]);

  useEffect(() => {
    const msgContainer = document.getElementById("main-chat-area");
    if (msgContainer) {
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }
  }, [allMessages, isTyping]);

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

  const sendImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        sendMessage(reader.result);
      }
    };
  };

  return (
    <>
      {selectedChats && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">{formatName(selectedUser)}</div>

          <div className="main-chat-area" id="main-chat-area">
            {allMessages.map((m, i) => {
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

                      {m.image && (
                        <img
                          src={m.image}
                          alt="chat-img"
                          style={{
                            maxWidth: "200px",
                            marginTop: "5px",
                            borderRadius: "8px",
                          }}
                        />
                      )}
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

            <div className="typing-indicator">
              {isTyping && <i>typing.....</i>}
            </div>
          </div>

          {showEmojiPicker && (
            <div
              style={{
                width: "100%",
                display: "flex",
                padding: "0px 20px",
                justifyContent: "right",
              }}
            >
              <EmojiPicker
                style={{ width: "300px", height: "320px" }}
                onEmojiClick={(emojiData) =>
                  setMessage((prev) => prev + emojiData.emoji)
                }
              />
            </div>
          )}

          <div className="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);

                socket.emit("user-typing", {
                  chatId: selectedChats?._id,
                  members: selectedChats.members.map((m: any) => m._id),
                  sender: user._id,
                });
              }}
            />

            <label htmlFor="file">
              <i className="fa fa-picture-o send-image-btn"></i>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                accept="image/jpg,image/png,image/jpeg,image/gif"
                onChange={sendImage}
              />
            </label>

            <button
              className="fa fa-smile-o send-emoji-btn"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            ></button>

            <button
              className="fa fa-paper-plane send-message-btn"
              onClick={() => sendMessage("")}
            ></button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
