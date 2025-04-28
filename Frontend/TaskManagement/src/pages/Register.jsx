import { useState } from "react";
import axiosCustom from "../utils/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const hanldeSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      await axiosCustom.post("auth/register", { name, email, password });
      toast.success("SignUp successful..!");
      setEmail("");
      setPassword("");
      setName("");
      navigate("/login");
    } catch (err) {
      toast.error("Please try with different details");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-5em)] bg-gray-100 p-5">
      <form
        onSubmit={hanldeSignUp}
        className="flex flex-col justify-around p-8 bg-card min-h-96 shadow-lg rounded-lg w-96"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          Enter Detail to register
        </h1>
        <input
          type="text"
          placeholder="Enter username...."
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;
