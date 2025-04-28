import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginFail, loginStart, loginSuccess } from "../redux/userSlice.jsx";
import axiosCustom from "../utils/axios.js";
import { toast } from "react-toastify";

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await axiosCustom.post(`auth/login`, {
        email,
        password,
      });
      const { token, detail } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("detail", JSON.stringify(detail));
      dispatch(loginSuccess(detail));
      toast.success("LogIn succesful");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      dispatch(loginFail());
      toast.error("Invalid credential");
      console.log("LogIn error", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-5em)] bg-gray-100 p-5">
      <form
        onSubmit={handleSignIn}
        className="flex flex-col justify-evenly p-8 bg-card min-h-96 shadow-lg rounded-lg w-96"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          Enter LogIn Details
        </h1>
        <input
          type="email"
          placeholder="Enter email...."
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Enter password...."
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-primary text-white rounded-md hover:bg-secondary transition duration-300"
        >
          Sign In
        </button>
        <div className="flex justify-center items-center text-textSub">
          <p>New user?</p>
          <Link to="/signup" className="text-primary hover:underline text-sm">
            register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
