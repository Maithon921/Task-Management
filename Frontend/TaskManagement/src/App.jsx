import "./App.css";
import Navbar from "./component/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="bg-background min-h-dvh ">
      <Navbar />
      <Outlet />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        theme="colored"
      />
    </div>
  );
}

export default App;
