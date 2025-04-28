import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useSelector((state) => state.tasks);

  const task = tasks.find((task) => task._id === id);

  if (!task) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-5em)]">
        <h1 className="text-xl text-gray-700">Task not found.</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-5em)] p-2">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-textMain">{task.title}</h1>

        <p className="text-gray-600 mb-2">
          <span className="font-semibold text-textMain">Description:</span>{" "}
          {task.description}
        </p>

        <p className="text-gray-600 mb-2">
          <span className="font-semibold text-textMain">Priority:</span>{" "}
          {task.priority}
        </p>

        <p className="text-gray-600 mb-2">
          <span className="font-semibold text-textMain capitalize">
            Status:
          </span>{" "}
          {task.status}
        </p>

        <p className="text-gray-600 mb-4 text-sm">
          <span className="font-semibold text-textMain text-base">
            Created At:
          </span>{" "}
          {new Date(task.createdAt).toLocaleString()}
        </p>

        <div className="flex justify-between mt-6">
          <Link
            to="/"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition"
          >
            Back
          </Link>

          <Link
            to={`/edit/${task._id}`}
            className="px-4 py-2 bg-primary text-white hover:bg-secondary rounded-md transition"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
