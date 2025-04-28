import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { toast } from "react-toastify";
import axiosCustom from "../utils/axios";
import { removeTask } from "../redux/taskSlice.jsx";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("detail"));
  const [isDelete, setIsDelete] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(!isDropdownOpen);
    toast.success("Log out Succesfull!");
    navigate("/");
  };

  const hanldeDeleteAccount = async () => {
    try {
      await axiosCustom.delete(`auth/delete/${currentUser._id}`);
      dispatch(logout());
      dispatch(removeTask());
      setIsDelete(!isDelete);
      setIsDropdownOpen(!isDropdownOpen);
      toast.success("Account Deleted");
      navigate("/");
    } catch (err) {
      toast.error("Failed to delete account");
      console.log("Failed to delete account", err);
    }
  };

  return (
    <nav className="bg-navbar sticky top-0 left-0 flex justify-between items-center p-4 rounded-b-xl shadow-2xl text-gray-200">
      <Link
        to="/"
        className="md:text-3xl font-extrabold text-gray-200 tracking-tight drop-shadow-md"
      >
        TASk<span className="text-accent">MANAGER</span>
      </Link>

      <div className="relative">
        {loggedIn && currentUser ? (
          <div className="relative">
            <p
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cursor-pointer bg-textSub px-3 py-1 sm:text-xl sm:px-4 sm:py-2 font-bold rounded-full capitalize"
            >
              {currentUser.name.charAt(0)}
            </p>

            {isDropdownOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-10 "
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div
                  className="absolute right-3 top-12 md:top-16 bg-card text-textMain rounded-md shadow-lg p-3 space-y-3 font-semibold"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className=" text-primary border-b border-gray-200 pb-2">
                    <p className="font-bold truncate">{currentUser.name}</p>
                    <p className="font-normal truncate">{currentUser.email}</p>
                  </div>
                  <p
                    className="flex items-center hover:text-textSub cursor-pointer"
                    onClick={() => setIsDelete(!isDelete)}
                  >
                    <DeleteIcon />
                    Delete Account
                  </p>
                  <button
                    className="flex items-center hover:text-textSub cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogoutIcon /> LogOut
                  </button>
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
                        Delete Account?
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Are you sure you want to delete your Account? This
                        action cannot be undone.
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
                          onClick={hanldeDeleteAccount}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2 sm:gap-3 justify-center font-medium">
            <Link
              to="/login"
              className="bg-primary text-navbar px-1 sm:px-3 py-1 rounded-lg shadow-md hover:bg-secondary focus:outline-none transition-all duration-200 text-center "
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="border border-primary text-white px-1 sm:px-3  py-1 rounded-lg shadow-md hover:bg-secondary focus:outline-none transition-all duration-200 text-center"
            >
              SignUp
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
