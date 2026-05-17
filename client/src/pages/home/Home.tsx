import Header from "./components/Header";
import SideBar from "./SideBar";

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <SideBar />
      </div>
    </div>
  );
};

export default Home;
