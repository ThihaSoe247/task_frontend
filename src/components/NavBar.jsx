import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Logout handler example:
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/users/login");
  };

  return (
    <nav className="flex justify-between items-center p-5 bg-white">
      <h1 className="font-bold text-2xl text-orange-500">Recipicity</h1>

      <ul className="flex space-x-10 items-center">
        {/* Show Home link only if token exists */}
        {token && (
          <li className="hover:text-orange-500">
            <Link to="/">Home</Link>
          </li>
        )}

        <li className="hover:text-orange-500">
          <Link to="/about">About</Link>
        </li>
        <li className="hover:text-orange-500">
          <Link to="/contact">Contact</Link>
        </li>
        {token && (
          <li className="hover:text-orange-500">
            <Link to="/recipes/create">Create Recipe</Link>
          </li>
        )}

        {/* Show Login/Register if no token */}
        {!token && (
          <>
            <li>
              <Link to="/users/login" className="hover:text-orange-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/users/register" className="hover:text-orange-400">
                Register
              </Link>
            </li>
          </>
        )}

        {/* Show Logout if token exists */}
        {token && (
          <li>
            <button onClick={logout} className="hover:text-orange-400">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
