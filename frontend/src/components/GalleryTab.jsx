import { useEffect, useState } from "react";
import { motion } from "framer-motion";
const API_BASE = import.meta.env.VITE_API_URL;

export default function GalleryTab() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image: null });
  const [editingId, setEditingId] = useState(null);

 
const fetchGallery = async () => {
    setLoading(true);
    try {
     const res = await fetch(`${API_BASE}/api/gallery`, {
        credentials: "include", // ✅ send cookies
      });
      const data = await res.json();
      setGallery(data);
    } catch (err) {
      console.error("Failed to load gallery", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);

    try {
     const url = editingId ? `${API_BASE}/api/gallery/${editingId}` : `${API_BASE}/api/gallery`;
      const method = editingId ? "PUT" : "POST";

      // ✅ Send token in header
   await fetch(url, {
        method,
        body: formData,
        credentials: "include", // ✅ send cookies
      });
      resetForm();
      fetchGallery();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({ title: item.title, description: item.description, image: null });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    // ✅ Send token in header
  await fetch(`${API_BASE}/api/gallery/${id}`, {
      method: "DELETE",
      credentials: "include", // ✅ send cookies
    });
    fetchGallery();
  };

  const resetForm = () => {
    setForm({ title: "", description: "", image: null });
    setEditingId(null);
  };

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow p-6 border-t-4 border-[#7B1C1C]"
      >
        <h2 className="text-xl font-bold text-[#7B1C1C] mb-4">
          {editingId ? "Edit Gallery Image" : "Add Gallery Image"}
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#7B1C1C]"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border p-3 rounded"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="border p-3 rounded md:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#7B1C1C]"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-[#7B1C1C] text-white px-6 py-2 rounded hover:bg-[#9B2C2C] transition"
            >
              {editingId ? "Update" : "Upload"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="border px-6 py-2 rounded hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>

      <div>
        <h3 className="text-xl font-bold text-[#7B1C1C] mb-4">Gallery Images</h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : gallery.length === 0 ? (
          <div className="border border-dashed rounded-xl p-10 text-center text-gray-500">
            No gallery images uploaded yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 hover:border-[#7B1C1C] transition"
              >
                <img
                  src={`${API_BASE}${item.image}`}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 space-y-2">
                  <h4 className="font-semibold text-[#7B1C1C]">{item.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-[#C9A84C] font-semibold hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-[#7B1C1C] font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}