import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const baseLink =
    "text-pink-700 hover:underline font-medium transition-colors";
  const activeLink = "text-white bg-yellow-600 px-2 py-1 rounded";

  return (
    <header className="bg-[#D2042D] shadow-md py-4">
      <nav className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 space-y-2 sm:space-y-0">
        <NavLink
          to="/"
          className="font-extrabold text-white text-xl tracking-wide"
        >
          🎉 Ashley's 18th
        </NavLink>
        <div className="flex gap-4 flex-wrap justify-center items-center text-sm sm:text-base">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : ""}`
            }
          >
            Event Info
          </NavLink>
          <NavLink
            to="/program"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : ""}`
            }
          >
            Program
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : ""}`
            }
          >
            Menu
          </NavLink>
          <NavLink
            to="/rsvplist"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : ""}`
            }
          >
            RSVP List
          </NavLink>
          <NavLink
            to="/gift"
            className="bg-green-600 text-white font-semibold px-4 py-1 rounded-full hover:bg-pink-700 transition"
          >
            💝 Cash Gift
          </NavLink>
          <NavLink
            to="/gift-notes"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : ""}`
            }
          >
            Gift Notes
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : ""}`
            }
          >
            Gallery
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
