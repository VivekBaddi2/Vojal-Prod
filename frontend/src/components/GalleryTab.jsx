import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL;

export default function GalleryTab() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [editingId, setEditingId] = useState(null);

  /* ======================
     FETCH GALLERY
  ====================== */
  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/gallery`);
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

  /* ======================
     FORM HANDLING
  ====================== */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  /* ======================
     SUBMIT (CREATE / UPDATE)
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);

    try {
      const url = editingId
        ? `${API}/gallery/${editingId}`
        : `${API}/gallery`;

      const method = editingId ? "PUT" : "POST";

      await fetch(url, { method, body: formData });

      resetForm();
      fetchGallery();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  /* ======================
     EDIT
  ====================== */
  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      image: null,
    });
  };

  /* ======================
     DELETE
  ====================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    await fetch(`${API}/gallery/${id}`, { method: "DELETE" });
    fetchGallery();
  };

  /* ======================
     RESET
  ====================== */
  const resetForm = () => {
    setForm({ title: "", description: "", image: null });
    setEditingId(null);
  };

  /* ======================
     UI
  ====================== */
  return (
    <div className="space-y-10">

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow p-6"
      >
        <h2 className="text-xl font-bold text-blue-900 mb-4">
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
            className="border p-3 rounded"
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
            className="border p-3 rounded md:col-span-2"
          />

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-900 text-white px-6 py-2 rounded hover:opacity-90"
            >
              {editingId ? "Update" : "Upload"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="border px-6 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>

      {/* GALLERY GRID */}
      <div>
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          Gallery Images
        </h3>

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
                className="bg-white rounded-xl shadow overflow-hidden"
              >
                <img
                  src={`${API.replace("/api", "")}${item.image}`}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4 space-y-2">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-900 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 font-semibold"
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
