import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileDropDown from "./ProfileDropDown";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  return (
    <div className="flex justify-evenly w-full py-4 space-x-0 bg-gray-800 shadow-lg ">
      <nav>
        <ul className="text-white flex gap-x-8">
          <li>
            <Link to="/" className="hover:text-blue-400 transition duration-300 ease-in-out">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-400 transition duration-300 ease-in-out">
              About
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-x-4">
        {token === null && (
          <>
            <Link to="/login">
              <button className="btn text-white">Log in</button>
            </Link>
            <Link to="/signup">
              <button className="btn text-white btn-primary">Sign Up</button>
            </Link>
          </>
        )}
        {token !== null && <ProfileDropDown />}
      </div>
    </div>
  );
};

export default Navbar;
