import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../helpers/axios";

export default function RegisterForm() {
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState(null);
  let navigate = useNavigate();

  let register = async (e) => {
    try {
      e.preventDefault();
      setError(null);

      let data = { name, email, password };
      let res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/users/register`,
        data,
        {
          withCredentials: true, // only needed if you rely on cookies from backend
        }
      );

      if (res.status === 200) {
        // Assume backend sends token in response.data.token
        const token = res.data.token;
        if (token) {
          // Save token in localStorage (or cookie)
          localStorage.setItem("token", token);
        }

        navigate("/");
      }
    } catch (e) {
      console.log("e herer:>> ", e);
      setError("Registration failed. Please check your input.");
    }
  };

  //thscp@gmail.com,14122001
  return (
    <form
      onSubmit={register}
      className="max-w-lg mx-auto border border-4 p-10 border-orange-500"
    >
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Register Form
      </h1>

      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
          placeholder="Enter your Name"
        />
      </div>

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
          Register
        </button>

        <button
          type="button"
          className="text-orange-500 border border-orange-500 hover:bg-orange-50 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex-1"
          onClick={() => console.log("Navigate to Login")}
        >
          Go to Login
        </button>
      </div>
    </form>
  );
}
