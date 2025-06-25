import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { Plus, CheckSquare, ListTodo, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    let fetchApi = async () => {
      try {
        // Fixed: Use the correct environment variable name and add fallback
        let response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/tasks`
        );

        if (!response.ok) throw new Error("Fetch failed");
        let data = await response.json();
        setTasks(data);
        console.log("data.data :>> ", data);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };
    fetchApi();
  }, []);

  let onDeleted = (_id) => {
    setTasks((prev) => prev.filter((task) => task._id !== _id));
  };

  let onCompleted = async () => {
    try {
      // Fixed: Use the same API URL pattern as above
      const response = await fetch(
        `${
          process.env.REACT_APP_API_URL ||
          "https://web-crud-task-manage.onrender.com"
        }/api/tasks`
      );
      const data = await response.json();
      setTasks(data); // 🔄 reloads all tasks
    } catch (err) {
      console.error("Failed to refresh tasks", err);
    }
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg">
                <ListTodo className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
                  Task Manager
                  <Sparkles className="w-6 h-6 text-purple-500" />
                </h1>
                <p className="text-gray-600 mt-1">
                  Stay organized and productive
                </p>
              </div>
            </div>

            {/* Fixed: Link should wrap the button, not be inside it */}
            <Link to="/tasks/add">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-purple-200 focus:outline-none group">
                <span className="flex items-center gap-2">
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  Add New Task
                </span>
              </button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ListTodo className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {tasks.length}
                  </p>
                  <p className="text-sm text-gray-600">Total Tasks</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <ListTodo className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {pendingTasks.length}
                  </p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckSquare className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {completedTasks.length}
                  </p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {tasks.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full mx-auto flex items-center justify-center">
                <ListTodo className="w-12 h-12 text-purple-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No tasks yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get started by creating your first task. Stay organized and boost
              your productivity!
            </p>
            {/* Fixed: Use relative path, not absolute localhost URL */}
            <Link to="/tasks/add">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg group">
                <span className="flex items-center gap-2">
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  Create Your First Task
                </span>
              </button>
            </Link>
          </div>
        ) : (
          /* Tasks Grid */
          <div className="space-y-6">
            {/* Pending Tasks Section */}
            {pendingTasks.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ListTodo className="w-5 h-5 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Pending Tasks ({pendingTasks.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingTasks.map((task) => (
                    <div
                      key={task._id}
                      className="transform hover:scale-105 transition-transform duration-200"
                    >
                      <TaskCard
                        task={task}
                        onDeleted={onDeleted}
                        onCompleted={onCompleted}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Tasks Section */}
            {completedTasks.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckSquare className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Completed Tasks ({completedTasks.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedTasks.map((task) => (
                    <div
                      key={task._id}
                      className="transform hover:scale-105 transition-transform duration-200 opacity-75"
                    >
                      <TaskCard
                        task={task}
                        onDeleted={onDeleted}
                        onCompleted={onCompleted}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <Link to="/tasks/add">
          <button className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 group">
            <Plus className="w-6 h-6 mx-auto group-hover:rotate-90 transition-transform" />
          </button>
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-1/4 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-10 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-1/4 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-10 animate-pulse delay-1000 pointer-events-none"></div>
    </div>
  );
}
