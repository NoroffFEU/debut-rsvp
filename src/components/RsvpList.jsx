// src/components/RSVPList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function RSVPList() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "rsvp"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRsvps(data);
      } catch (error) {
        console.error("Error fetching RSVPs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRSVPs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-2 px-6 py-10 bg-black text-white rounded shadow-lg">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        📋 RSVP Responses
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : rsvps.length === 0 ? (
        <p className="text-center text-gray-400">No RSVP yet.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border border-pink-700">
              <thead>
                <tr className="bg-[#9a560c] text-white">
                  <th className="p-3 border border-pink-700">Name</th>
                  <th className="p-3 border border-pink-700">Guests</th>
                  <th className="p-3 border border-pink-700">Message</th>
                  <th className="p-3 border border-pink-700">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map(({ id, name, guests, message, timestamp }) => (
                  <tr key={id} className="hover:bg-[#9a560c]/50">
                    <td className="p-3 border border-pink-700">{name || "—"}</td>
                    <td className="p-3 border border-pink-700">{guests ?? 0}</td>
                    <td className="p-3 border border-pink-700">{message || "—"}</td>
                    <td className="p-3 border border-pink-700">
                      {timestamp?.seconds
                        ? new Date(timestamp.seconds * 1000).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {rsvps.map(({ id, name, guests, message, timestamp }) => (
              <div
                key={id}
                className="bg-[#1a1a1a] border border-pink-700 rounded-lg p-4 shadow"
              >
                <p><strong className="text-pink-500">Name:</strong> {name || "—"}</p>
                <p><strong className="text-pink-500">Guests:</strong> {guests ?? 0}</p>
                <p><strong className="text-pink-500">Message:</strong> {message || "—"}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {timestamp?.seconds
                    ? new Date(timestamp.seconds * 1000).toLocaleString()
                    : "—"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-8 text-white hover:underline"
      >
        ← Back
      </button>
    </div>
  );
}
