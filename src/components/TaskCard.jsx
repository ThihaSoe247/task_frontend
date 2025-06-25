import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_API_URL;

export default function TaskCard({ task, onDeleted, onCompleted }) {
  let deleteTask = async () => {
    let res = await axios.delete(`${API_URL}/api/tasks/${task._id}`);
    if (res.status === 200) {
      onDeleted(task._id);
    }
  };
  let completedBackend = async (e) => {
    try {
      await axios.patch(`${API_URL}/api/tasks/${task._id}`, {
        completed: e.target.checked,
      });
      onCompleted();
    } catch (err) {
      console.error("Failed to update completion", err);
    }
  };

  return (
    <div className="p-5 border-3 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h1 className={`text-2xl ${task.completed ? "line-through" : ""}`}>
          {task.title}
        </h1>
        <div className="flex space-x-3">
          <Link
            to={`/tasks/edit/${task._id}`}
            className="border bg-blue-300 px-2 py-1 rounded-lg text-lg text-sm"
          >
            Edit
          </Link>
          <button
            onClick={deleteTask}
            className="border px-2 py-1 rounded-lg text-lg bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
      <h2>{task.description}</h2>
      <h3 className="text-gray-500">Created At: {task.createdAt}</h3>
      <div className="mt-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={completedBackend}
        />
        <label className="ml-2">Mark this as completed</label>
      </div>
    </div>
  );
}
