import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../helpers/axios";

export default function LogInForm() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState(null);
  let navigate = useNavigate();

  let login = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      let data = { email, password };
      let res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/users/login`,
        data,
        {
          withCredentials: true, // only needed if you rely on cookies from backend
        }
      );
      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (e) {
      console.log("e: :>> ", e.response.data.error);
      setError(e.response.data.error);
    }
  };
  return (
    <form
      onSubmit={login}
      className="max-w-lg mx-auto border border-4 p-10 border-orange-500"
    >
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Login Form
      </h1>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
          placeholder="Enter your email"
        />
        {!!error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
          placeholder="Enter your password"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex-1"
        >
          Sign Up
        </button>

        <button
          type="button"
          className="text-orange-500 border border-orange-500 hover:bg-orange-50 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex-1"
          onClick={() => console.log("Navigate to Register")}
        >
          Register Here
        </button>
      </div>
    </form>
  );
}
