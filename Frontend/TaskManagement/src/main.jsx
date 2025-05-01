import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./pages/LogIn.jsx";
import Register from "./pages/Register.jsx";
import { Provider } from "react-redux";
import appStore from "./redux/Store.jsx";
import DisplayTask from "./pages/DisplayTask.jsx";
import AddTask from "./component/AddTask.jsx";
import EditTask from "./component/EditTask.jsx";
import TaskDetail from "./pages/TaskDetail.jsx";
import ErrorPage from "./pages/Error.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <DisplayTask />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/addtask",
        element: <AddTask />,
      },
      {
        path: "/edit/:id",
        element: <EditTask />,
      },
      {
        path: "/detail/:id",
        element: <TaskDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
