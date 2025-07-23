import React from 'react';
import { useNavigate } from "react-router-dom";
function Menu() {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-center">
      <h2 className="text-3xl font-semibold text-[#ffbf00] mb-4">🍽️ Birthday Dinner Menu</h2>
      <p className="text-white">This page will showcase the food and drink menu for the birthday party.</p>
      <img
        src="/menu.jpg" // place your image in /public/menu.jpg or adjust the path
        alt="Birthday Menu"
        className="mt-5 w-full max-w-2xl rounded-lg shadow-lg"
      />
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-white font-semibold mb-4 hover:underline m-7"
      >
        ← Back
      </button>
    </div>
  );
}

export default Menu;
