import { useSelector } from "react-redux";
import ChatArea from "./components/ChatArea";
import Header from "./components/Header";
import SideBar from "./SideBar";
import { io } from "socket.io-client";
import { useEffect } from "react";

const Home = () => {
  const selectedChats = useSelector((state: any) => state.user.selectedChat);
  const users = useSelector((state: any) => state.user.user);
  const socket = io("http://localhost:10000");

  useEffect(() => {
    if (users) {
      socket.emit("join-room", users._id);
    }
  }, [users]);
  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <SideBar />
        {selectedChats && <ChatArea />}
      </div>
    </div>
  );
};

export default Home;
