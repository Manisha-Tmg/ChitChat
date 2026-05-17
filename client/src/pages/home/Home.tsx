import ChatArea from "./components/ChatArea";
import Header from "./components/Header";
import SideBar from "./SideBar";

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <SideBar />
        <ChatArea />
      </div>
    </div>
  );
};

export default Home;
