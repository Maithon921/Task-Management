import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosCustom from "../utils/axios";
import TaskCard from "../component/TaskCard.jsx";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasksFail,
  fetchTasksStart,
  fetchTasksSuccess,
} from "../redux/taskSlice.jsx";

function DisplayTask() {
  const [filter, setFilter] = useState("all");
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const loggedIn = localStorage.getItem("token");
  const currentUser = loggedIn
    ? JSON.parse(localStorage.getItem("detail"))
    : null;

  loggedIn &&
    useEffect(() => {
      const fetchTask = async () => {
        dispatch(fetchTasksStart());
        try {
          const response = await axiosCustom.get("task/all");
          dispatch(fetchTasksSuccess(response.data));
        } catch (err) {
          dispatch(fetchTasksFail());
        }
      };
      fetchTask();
    }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return task;
    if (filter === "active") return task.status === "active";
    if (filter === "completed") return task.status === "completed";
  });

  return (
    <div className="min-h-[calc(100vh-6em)] flex flex-col items-center justify-start bg-gray-50 p-4 ">
      {/* If not logged in, show the login prompt */}
      {!loggedIn ? (
        <div className="text-center max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Welcome to TaskManager!
          </h2>
          <p className="text-gray-600 mb-6">
            Log in to use the application and start managing your tasks.
          </p>
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
          >
            Log In
          </Link>
        </div>
      ) : (
        <div className=" flex flex-col items-center mt-5">
          <h2 className="text-3xl  text-center font-bold text-textMain mb-6 capitalize">
            Welcome back, {currentUser.name}!
          </h2>

          {/* Add Task Button */}
          <Link
            to="/addtask"
            className="fixed bottom-1 right-1 sm:right-10 sm:bottom-10 text-white bg-navbar rounded-full p-0.5 sm:p-4 shadow-lg hover:bg-textMain transition duration-300"
          >
            <AddIcon fontSize="large" />
          </Link>

          {/* Filter buttons */}
          <div className="mb-4 font-semibold text-gray-700 flex gap-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md ${
                filter === "all"
                  ? "border-b-4 border-primary text-primary"
                  : "text-gray-600"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-md ${
                filter === "active"
                  ? "border-b-4 border-primary text-primary"
                  : "text-gray-600"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-md ${
                filter === "completed"
                  ? "border-b-4 border-primary text-primary"
                  : "text-gray-600"
              }`}
            >
              Completed
            </button>
          </div>

          {/* Task Cards */}
          {filteredTasks.length > 0 ? (
            <div className="flex flex-col items-center mb-8 sm:mb-0 gap-5 w-full sm:w-[550px] md:w-[700px]">
              {filteredTasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-6">
              <p className="text-lg">No tasks found.</p>
              <p className="text-sm text-gray-400 mt-2">
                Try adding a new task!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DisplayTask;
