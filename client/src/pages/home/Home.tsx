import { useSelector } from "react-redux";
import ChatArea from "./components/ChatArea";
import Header from "./components/Header";
import SideBar from "./SideBar";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:10000");

const Home = () => {
  const selectedChats = useSelector((state: any) => state.user.selectedChat);
  const users = useSelector((state: any) => state.user.user);
  const [onlineUser, setOnlineUser] = useState();
  useEffect(() => {
    if (users) {
      socket.emit("join-room", users._id);
      socket.emit("user-logged", users._id);
      socket.on("onlne-user", (onlineUsers) => {
        setOnlineUser(onlineUsers);
      });
    }
  }, [users]);
  return (
    <div className="home-page">
      <Header socket={socket} />
      <div className="main-content">
        <SideBar socket={socket} onlineUser={onlineUser} />
        {selectedChats && <ChatArea socket={socket} />}
      </div>
    </div>
  );
};

export default Home;
