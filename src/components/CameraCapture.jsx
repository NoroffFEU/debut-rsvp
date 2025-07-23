// src/components/CameraCapture.jsx
import React, { useRef, useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";

export default function CameraCapture({ rsvpName }) {
  const inputRef = useRef();
  const [previewFiles, setPreviewFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const MAX_FILE_SIZE_MB = 30;

  const handleCapture = async (e) => {
    const files = Array.from(e.target.files);
    const previews = [];

    for (let file of files) {
      const isVideo = file.type.startsWith("video");
      const sizeMB = file.size / (1024 * 1024);

      if (isVideo && sizeMB > MAX_FILE_SIZE_MB) {
        toast.error(`❌ ${file.name} exceeds 30MB`);
        continue;
      }

      if (!isVideo) {
        try {
          file = await imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1280,
            useWebWorker: true,
          });
        } catch {
          toast.error("❌ Compression failed");
          continue;
        }
      }

      previews.push({
        file,
        type: isVideo ? "video" : "image",
        url: URL.createObjectURL(file),
      });
    }

    setPreviewFiles(previews);
  };

  const handleUpload = async () => {
    if (!previewFiles.length) return;

    setUploading(true);
    const storage = getStorage();

    for (let { file, type } of previewFiles) {
      const id = uuid();
      const storageRef = ref(storage, `gallery/${id}-${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        await addDoc(collection(db, "gallery"), {
          url,
          type,
          name: rsvpName || "anonymous",
          message,
          timestamp: serverTimestamp(),
        });
      } catch (err) {
        toast.error("Upload failed. Try again.");
      }
    }

    toast.success("🎉 Upload complete!");
    setShowModal(true);
    setPreviewFiles([]);
    setMessage("");
    setUploading(false);
    fetchGallery(); // Update gallery immediately
  };

  const fetchGallery = async () => {
    const q = query(collection(db, "gallery"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => doc.data());
    setGallery(data);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="text-center text-pink-700 mt-10">
      <h3 className="text-lg font-semibold mb-2">📷 Upload a Memory</h3>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Say something about this memory..."
        minLength={30}
        required
        className="w-full max-w-md mx-auto p-2 border rounded mb-4"
      />

      <div className="mb-4">
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          capture="environment"
          ref={inputRef}
          onChange={handleCapture}
          className="hidden"
        />
        <button
          onClick={() => inputRef.current.click()}
          className="hover:bg-pink-700 text-white px-5 py-2 rounded-full font-semibold mr-2"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Photo/Video"}
        </button>

        {previewFiles.length > 0 && (
          <button
            onClick={handleUpload}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-semibold"
            disabled={uploading}
          >
            Upload
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white text-black p-6 rounded shadow-lg max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-3">🎉 Upload Complete</h2>
            <p>Thank you for contributing to the birthday gallery!</p>
            <button
              className="mt-4 bg-pink-600 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Live Gallery */}
      <div className="mt-10">
        <h4 className="text-gray-600 text-lg mb-4">🖼️ Recent Uploads</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gallery.map((item, idx) =>
            item.type === "image" ? (
              <img
                key={idx}
                src={item.url}
                alt="uploaded"
                className="rounded shadow cursor-pointer"
                onClick={() => setSelectedImage(item.url)}
              />
            ) : (
              <video
                key={idx}
                src={item.url}
                controls
                className="rounded shadow"
              />
            )
          )}
        </div>
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="full"
              className="max-h-[90vh] rounded-lg"
            />
            {/* <a
              href={selectedImage}
              download
              className="absolute bottom-2 right-2 bg-black px-4 py-2 rounded shadow text-white font-semibold hover:bg-pink-200"
              onClick={(e) => e.stopPropagation()}
            >
              Save
            </a> */}
          </div>
        </div>
      )}
    </div>
  );
}
