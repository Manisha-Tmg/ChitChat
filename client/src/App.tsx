import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";

const App = () => {
  const loader = useSelector((state: any) => state.loader.loader);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {loader && <Loader />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
};

export default App;
