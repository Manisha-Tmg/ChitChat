import { useSelector } from "react-redux";
import ChatArea from "./components/ChatArea";
import Header from "./components/Header";
import SideBar from "./SideBar";

const Home = () => {
  const selectedChats = useSelector((state: any) => state.user.selectedChat);
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
