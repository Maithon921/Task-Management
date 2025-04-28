import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosCustom from "../utils/axios.js";
import { toast } from "react-toastify";
import { addTask } from "../redux/taskSlice.jsx";

function AddTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosCustom.post(`task/add`, {
        title,
        description,
        priority,
      });
      dispatch(addTask(response.data.newTask));
      toast.success("Task added");
      navigate("/");
    } catch (err) {
      toast.error("Fail to add task");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-5em)] bg-gray-100 p-5">
      <form
        onSubmit={handleAdd}
        className="flex flex-col justify-evenly p-6 bg-card min-h-96 shadow-lg rounded-lg w-96"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center text-textMain mb-4">
          Enter Task Details
        </h1>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
        />
        <textarea
          type="text"
          placeholder="Enter description...."
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
        />

        <label htmlFor="priority" className="font-semibold text-textSub mb-2">
          Priority:
        </label>
        <select
          name="priority"
          id="priority"
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 mb-4"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div className="flex gap-4 justify-between mt-4">
          <Link to="/" className="w-1/2">
            <button
              type="button"
              className="w-full p-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Back
            </button>
          </Link>
          <button
            type="submit"
            className="w-1/2 p-3 bg-primary text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
