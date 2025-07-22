import React, { useState, useEffect } from "react";
import { db, app, storage } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function Gallery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const q = query(collection(db, "gallery"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data());
      setItems(data);
    };

    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-pink-700 mb-6">📸 Birthday Gallery</h2>
      <p className="text-white mb-10 max-w-xl mx-auto">
        Thank you for the memories! Enjoy some highlights from Ashley's 18th celebration.
      </p>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, i) =>
            item.type === "image" ? (
              <img
                key={i}
                src={item.url}
                alt={`gallery-${i}`}
                className="rounded-lg shadow-lg hover:scale-105 transition-transform"
              />
            ) : (
              <video
                key={i}
                src={item.url}
                controls
                className="rounded-lg shadow-lg"
              />
            )
          )}
        </div>
      ) : (
        <p className="text-gray-400">No photos yet. Stay tuned!</p>
      )}
    </div>
  );
}

export default Gallery;
