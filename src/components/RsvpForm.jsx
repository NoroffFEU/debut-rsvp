// src/components/RsvpForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import confetti from "canvas-confetti";

function RsvpForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    guests: 1,
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "guests" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
    });

    const guestsCount = Math.max(1, parseInt(form.guests, 10) || 1);
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      guests: guestsCount,
      message: form.message.trim(),
      timestamp: serverTimestamp(),
    };

    setLoading(true);

    try {
      await addDoc(collection(db, "rsvp"), payload);
      localStorage.setItem("rsvpSuccess", "true");
      toast.success("🎉 RSVP submitted successfully!");
      setForm({ name: "", email: "", guests: 1, message: "" });
    } catch (error) {
      console.error("RSVP submission failed:", error);
      toast.error("❌ Failed to submit RSVP. Try again.");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center px-4 m-5">
      <h1 className="text-2xl font-bold text-center text-pink-700">
        {" "}
        RSVP and let's have a blast.
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#D2042D] shadow-md rounded p-6 mt-6 space-y-4 max-w-md w-full"
      >
        <h2 className="text-white text-4xl font-bold text-center">RSVP</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="placeholder w-full border p-2 rounded"
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="placeholder w-full border p-2 rounded"
        />

        <input
          name="guests"
          type="number"
          value={form.guests}
          onChange={handleChange}
          placeholder="Number of Guests"
          min="1"
          max="10"
          required
          className="placeholder w-full border p-2 rounded"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your message (minimum 30 characters)"
          className="placeholder w-full border p-2 rounded"
          required
          minLength={30}
        />

        <div className="flex justify-center items-center">
          <button
            type="submit"
            disabled={loading}
            className={`font-bold rsvp-form-button text-white py-2 px-6 rounded transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "RSVP Now"}
          </button>
        </div>
      </form>
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

export default RsvpForm;
