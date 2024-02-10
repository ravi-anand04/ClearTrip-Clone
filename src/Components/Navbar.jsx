import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { Button } from "flowbite-react";
import Logo from "../assets/icons/Logo";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // fetchCategories();
    setIsLoggedIn(!!localStorage.getItem("cleartrip_token"));
  }, []);

  const [openLoginModal, setLoginModal] = useState(false);
  const [openRegisterModal, setRegisterModal] = useState(false);

  const toggleLoginModel = () => {
    setLoginModal((prev) => !prev);
  };

  const toggleRegisterModel = () => {
    setRegisterModal((prev) => !prev);
  };

  return (
    <div className="sticky top-0 shadow-xl z-10 bg-white py-2">
      <div className="nav-top flex flex-wrap justify-between py-1 px-48 max-sm:px-2">
        <div className="flex gap-2 items-center">
          <Link to={`/`}>
            <Logo />
          </Link>
        </div>
        <div>
          {isLoggedIn ? (
            <>
              <span className="cursor-pointer">
                Hi,{" "}
                <b>{localStorage.getItem("cleartrip_name") || "Traveller"}</b> |{" "}
              </span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("cleartrip_token");
                  window.location.reload();
                }}
              >
                Logout{" "}
              </span>
            </>
          ) : (
            <>
              <div
                className="cursor-pointer rounded-xl border border-black px-2 py-2 font-semibold"
                onClick={() => setLoginModal(true)}
              >
                Log in / Sign up
              </div>
              <Login
                openLoginModal={openLoginModal}
                toggleLoginModel={toggleLoginModel}
                toggleRegisterModel={toggleRegisterModel}
              />

              <Register
                openRegisterModal={openRegisterModal}
                toggleRegisterModel={toggleRegisterModel}
                toggleLoginModel={toggleLoginModel}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
