import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import toast from "react-hot-toast";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      toast.success("Logged out successfully", {
        position: "top-center",
        duration: 1000,
      });
      return navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const getInitialTheme = () => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return (
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light")
        );
      }
    } catch (error) {
      return "light"; // Default to light mode if localStorage is unavailable
    }
    return "light";
  };

  const user = useSelector((store) => store.user);
  const [theme, setTheme] = useState(getInitialTheme);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (
        !e.target.closest(".mobile-menu") &&
        !e.target.closest(".hamburger")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm sticky top-0 z-50 w-full">
        <div className="flex-1 flex items-center gap-2 ml-5">
          <img
            src="conversation.png"
            alt="App Logo"
            className="h-8 w-8 object-contain"
          />
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900 cursor-pointer"
          >
            <span className="text-primary">tech</span>
            <span className="text-accent">Tinder</span>
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          {/* Desktop Dark Mode Toggle */}

          {/* //*********YAHA PAR EK BACK TO HOME BUTTON LAGANA HAI BAAD MEI  */}

          {/* <Link
            to="/"
            className="absolute right-4 top-4  hidden md:flex md:right-70 md:top-6  items-center text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Back to home
          </Link> */}
          <div className="hidden md:flex items-center gap-2 mr-5">
            <span className="text-sm font-medium">
              {theme === "light" ? "Light Mode" : "Dark Mode"}
            </span>
            <button
              onClick={toggleTheme}
              className="relative flex h-6 w-12 items-center rounded-full bg-gray-300 dark:bg-gray-600 p-1 transition-all duration-300"
            >
              <span
                className={`absolute left-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ${
                  theme === "dark" ? "translate-x-6 bg-yellow-400" : ""
                }`}
              >
                {theme === "dark" ? "🌙" : "☀️"}
              </span>
            </button>
          </div>

          {/* Desktop Profile Dropdown */}
          {user && (
            <div className="hidden md:flex dropdown dropdown-end mx-7 items-center gap-3 relative">
              <p className="text-lg font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 text-transparent bg-clip-text tracking-wide animate-pulse drop-shadow-md">
              ⚡Welcome {user.firstName}, glad you’re here!
              </p>

              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User Photo" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box  mt-3 w-52 p-2 shadow absolute top-8"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/Connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <Link to="/change-password">Change Password</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}
          {/* {showChangePasswordModal && (
        <ChangePasswordModal onClose={() => setShowChangePasswordModal(false)} />
      )} */}

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden relative">
            {user ? (
              <>
                <img
                  src={
                    user.photoUrl ||
                    "https://tse2.mm.bing.net/th?id=OIP.cjKYIzYOViaYl4E6Pb2ZtgHaHa&pid=Api&P=0&h=260"
                  }
                  alt="Profile"
                  onClick={toggleMobileMenu}
                  className="md:hidden w-10 h-10 mr-4 rounded-full border cursor-pointer"
                />

                {isMobileMenuOpen && (
                  <div className="mobile-menu absolute top-16 right-4 bg-base-100 shadow-md rounded-lg p-4 w-48 z-50">
                    <div className="mb-3 text-center">
                      <p className="text-base font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 text-transparent bg-clip-text text-center tracking-wide drop-shadow-md animate-pulse">
                      ⚡Welcome {user.firstName}, glad you’re here!
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-sm font-medium">
                        {theme === "light" ? "Light Mode" : "Dark Mode"}
                      </span>
                      <button
                        onClick={toggleTheme}
                        className="relative flex h-6 w-12 items-center rounded-full bg-gray-300 dark:bg-gray-600 p-1 transition-all duration-300"
                      >
                        <span
                          className={`absolute left-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ${
                            theme === "dark"
                              ? "translate-x-6 bg-yellow-400"
                              : ""
                          }`}
                        >
                          {theme === "dark" ? "🌙" : "☀️"}
                        </span>
                      </button>
                    </div>

                    <hr className="my-2" />

                    <Link to="/profile" className="block py-2">
                      Profile
                    </Link>
                    <Link to="/Connections" className="block py-2">
                      Connections
                    </Link>
                    <Link to="/requests" className="block py-2">
                      Requests
                    </Link>
                    <Link to="/change-password" className="block py-2">
                      Change Password
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block py-2 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={toggleMobileMenu}
                  className="hamburger text-4xl p-2 md:hidden"
                >
                  ☰
                </button>

                {isMobileMenuOpen && (
                  <div className="mobile-menu absolute top-16 right-4 bg-base-100 shadow-md rounded-lg p-4 w-48 z-50">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium">
                        {theme === "light" ? "Light Mode" : "Dark Mode"}
                      </span>
                      <button
                        onClick={toggleTheme}
                        className="relative flex h-6 w-12 items-center rounded-full bg-gray-300 dark:bg-gray-600 p-1 transition-all duration-300"
                      >
                        <span
                          className={`absolute left-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ${
                            theme === "dark"
                              ? "translate-x-6 bg-yellow-400"
                              : ""
                          }`}
                        >
                          {theme === "dark" ? "🌙" : "☀️"}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* {isMobileMenuOpen && (
              <div className="mobile-menu absolute top-16 right-4 bg-base-100 shadow-md rounded-lg p-4 w-48 z-50">
                <div className="mb-3 text-center">
                  <p className="text-base font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 text-transparent bg-clip-text text-center tracking-wide drop-shadow-md animate-bounce">
                    Welcome, {user.firstName} 👋
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">
                    {theme === "light" ? "Light Mode" : "Dark Mode"}
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="relative flex h-6 w-12 items-center rounded-full bg-gray-300 dark:bg-gray-600 p-1 transition-all duration-300"
                  >
                    <span
                      className={`absolute left-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ${
                        theme === "dark" ? "translate-x-6 bg-yellow-400" : ""
                      }`}
                    >
                      {theme === "dark" ? "🌙" : "☀️"}
                    </span>
                  </button>
                </div>

                <hr className="my-2" />

                {user && (
                  <>
                    <Link to="/profile" className="block py-2">
                      Profile
                    </Link>
                    <Link to="/Connections" className="block py-2">
                      Connections
                    </Link>
                    <Link to="/requests" className="block py-2">
                      Requests
                    </Link>
                    <Link to="/change-password" className="block py-2">
                      Change Password
                    </Link>
                    <a
                      onClick={handleLogout}
                      className="block py-2 cursor-pointer"
                    >
                      Logout
                    </a>
                  </>
                )}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
