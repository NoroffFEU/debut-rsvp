import React from 'react';
import { useNavigate } from "react-router-dom";
function About() {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto px-4 py-10 text-center">
      <h2 className="text-3xl font-bold text-pink-700 mb-6">📅 Birthday Details</h2>

      <div className="bg-pink-50 p-6 rounded shadow-md">
        <h3 className='text-pink-700 text-4xl font-bold'>You're Invited!</h3>
        <p className="text-gray-600 text-lg mb-4 mt-4">
          <strong>Date:</strong> Saturday, 13th September 2025<br />
          <strong>Time:</strong> 4:00 PM – 11:30 PM
        </p>

        <p className="text-lg text-gray-600 mb-4">
          <strong>Address:</strong><br />
          Marks Tey Parish Hall<br />
          Old London Road<br />
          Essex, Colchester, CO6 1EJ, UK
        </p>

        <p className="text-lg text-gray-600">
          <strong>Dress Code:</strong> Any Formal attire except Red and Gold
        </p>
        <p className='text-2xl text-red-600 mt-5 font-semibold'>Arrive dressed in your best!</p>
        <img
        src="/attire.png" 
        alt="dress code"
        className="mt-5 w-full max-w-2xl rounded-lg shadow-lg"
      />
      </div>
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

export default About;

