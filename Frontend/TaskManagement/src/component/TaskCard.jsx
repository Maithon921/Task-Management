import { Link } from "react-router-dom";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import axiosCustom from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { deleteTask, updateTask } from "../redux/taskSlice";

function TaskCard({ task }) {
  const [isDelete, setIsDelete] = useState(false);
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await axiosCustom.delete(`task/delete/${task._id}`);
      dispatch(deleteTask(task._id));
      toast.success("Task Deleted");
    } catch (err) {
      toast.error("Failled to delete task");
    }
  };

  const toggleTask = async () => {
    try {
      const response = await axiosCustom.put(`task/status/${task._id}`);
      console.log(response.data.task);
      dispatch(updateTask(response.data.task));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={`flex justify-around items-center max-w-lg text-gray-800 ${
        task.status === "completed" ? "bg-gray-200" : "bg-card"
      } rounded-md shadow-xl w-full py-2`}
    >
      <p
        onClick={toggleTask}
        className={`${
          task.status === "completed" ? "text-primary" : ""
        } cursor-pointer`}
      >
        <DoneAllIcon />
      </p>

      <Link to={`/detail/${task._id}`}>
        <div className="w-24 sm:w-36 ">
          <h1
            className={`${
              task.status == "completed"
                ? "text-textSub line-through"
                : "text-textMain"
            } truncate font-medium`}
          >
            {task.title}
          </h1>
          <p
            className={`${
              task.status == "completed" ? "line-through" : ""
            } text-textSub text-xs truncate`}
          >
            {task.description}
          </p>
        </div>
      </Link>
      <p
        className={`text-sm px-1 rounded-md min-w-11 text-center text-white
        ${
          task.status === "completed"
            ? "bg-success"
            : task.priority === "high"
            ? "bg-accent"
            : task.priority === "medium"
            ? "bg-warning"
            : "bg-low"
        }
        `}
      >
        {task.status === "active" ? task.priority : "Done"}
      </p>

      <div className="flex gap-3">
        <button
          className="text-accent"
          onClick={() => setIsDelete((prev) => !prev)}
        >
          <DeleteForeverIcon />
        </button>
        <Link to={`/edit/${task._id}`}>
          <EditIcon />
        </Link>
      </div>

      {isDelete && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
          onClick={() => setIsDelete(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-[90%] max-w-sm shadow-lg text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Delete Task?
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
                onClick={() => setIsDelete(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                onClick={handleDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
