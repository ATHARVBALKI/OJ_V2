import React, { useState } from "react";
import { login } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = formdata;

  const handleOnChange = (e) => {
    setformdata((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleonsubmit = (e) => {
    e.preventDefault();

    console.log(formdata);
    dispatch(login(formdata, navigate));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <form
          className="flex flex-col w-full gap-y-4 mt-6"
          onSubmit={handleonsubmit}
        >
          <label className="w-full">
            <p className="text-sm text-white mb-1">
              Email Address<sup className="text-red-500">*</sup>
            </p>
            <input
              required
              onChange={handleOnChange}
              type="email"
              placeholder="Enter email address"
              name="email"
              value={email}
              className="bg-gray-800 rounded-md text-gray-200 w-full p-3"
            />
          </label>

          <label className="w-full relative">
            <p className="text-sm text-white mb-1">
              Password<sup className="text-red-500">*</sup>
            </p>
            <input
              required
              onChange={handleOnChange}
              type={showPassword ? "text" : "password"} // Toggle type based on showPassword state
              placeholder="Enter Password"
              name="password"
              value={password}
              className="bg-gray-800 rounded-md text-gray-200 w-full p-3 pr-12" // Add additional padding for the eye button
            />
            {/* Password visibility toggle */}
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>
          <Link to="/resetform">
            <button className="bg-blue-400 rounded-md w-full font-medium text-black px-4 py-2 mt-6">
              forget Password
            </button>
          </Link>

          <button
            className="bg-yellow-400 rounded-md font-medium text-black px-4 py-2 mt-6"
            type="submit"
          >
            Login
          </button>
          <button
            className="w-full flex justify-center items-center bg-yellow-50 rounded-[8px] font-medium text-bg-gray-900
            border border-bg-white px-[12px] py-[8px] gap-x-2 mt-6 "
          >
            <p>Sign Up with Google</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
