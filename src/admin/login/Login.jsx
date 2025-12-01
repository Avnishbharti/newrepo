import React from "react";
import logo from '../../assets/logo.png'


const Login = () => {
  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      {/* Card */}
      <div className="w-[420px] bg-white p-10 shadow-xl rounded-xl border border-gray-200">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src={logo} 
            alt="Company Logo" 
            className="w-32 object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        {/* Form */}
        <form className="space-y-5">

          {/* Username */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg 
          transition font-semibold cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
