import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Edit3, ArrowLeft } from "lucide-react";

export default function Add() {
  let [title, setTitle] = useState("");
  let [desc, setDesc] = useState("");
  let navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    let fetchRecipe = async () => {
      if (id) {
        let res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/tasks/${id}`
        );

        // let res = await axios.get("http://localhost:4000/api/tasks/" + id);
        if (res.status === 200) {
          setTitle(res.data.title);
          setDesc(res.data.description);
        }
      }
    };
    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      let newTask = {
        title: title,
        description: desc,
      };
      let res;
      if (id) {
        // res = await axios.patch(
        //   "http://localhost:4000/api/tasks/" + id,
        //   newTask
        // );
        res = await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/tasks/${id}`,
          newTask
        );

        if (res.status === 200) {
          navigate("/");
        }
      } else {
        res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/tasks/`,
          newTask
        );

        // res = await axios.post("http://localhost:4000/api/tasks/", newTask);
        if (res.status === 201) {
          navigate("/");
        }
      }

      setTitle("");
      setDesc("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Tasks
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg">
              {id ? (
                <Edit3 className="w-6 h-6 text-white" />
              ) : (
                <Plus className="w-6 h-6 text-white" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              {id ? "Update Task" : "Create New Task"}
            </h1>
          </div>
          <p className="text-gray-600 ml-12">
            {id
              ? "Make changes to your existing task"
              : "Add a new task to your list"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Title Input */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700"
              >
                Task Title
              </label>
              <div className="relative">
                <input
                  id="title"
                  type="text"
                  placeholder="Enter your task title..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-white/70"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full opacity-50"></div>
                </div>
              </div>
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                Description
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  placeholder="Describe your task in detail..."
                  rows="5"
                  required
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-white/70 resize-none"
                />
                <div className="absolute top-4 right-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full opacity-50"></div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:ring-4 focus:ring-purple-200 focus:outline-none group"
              >
                <span className="flex items-center justify-center gap-2">
                  {id ? (
                    <>
                      <Edit3 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      Update Task
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                      Create Task
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}
