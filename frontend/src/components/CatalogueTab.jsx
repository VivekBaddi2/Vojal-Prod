import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_URL;

export default function CatalogueTab() {
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    file: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("catalogueCategories");
    return saved ? JSON.parse(saved) : [];
  });
  const [newCategoryInput, setNewCategoryInput] = useState("");

  const fetchCatalogues = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/catalogue`, {
        credentials: "include",
      });
      const data = await res.json();
      setCatalogues(data);
    } catch (err) {
      console.error("Failed to load catalogues", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCatalogues();
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
    formData.append("category", form.category);
    if (form.file) formData.append("file", form.file);

    try {
      const url = editingId
        ? `${API_BASE}/api/catalogue/${editingId}`
        : `${API_BASE}/api/catalogue`;
      const method = editingId ? "PUT" : "POST";

      await fetch(url, {
        method,
        body: formData,
        credentials: "include",
      });

      resetForm();
      fetchCatalogues();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      description: item.description || "",
      category: item.category || "",
      file: null,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this catalogue?")) return;
    await fetch(`${API_BASE}/api/catalogue/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchCatalogues();
  };
  const handleAddCategory = () => {
    const trimmed = newCategoryInput.trim();
    if (!trimmed) return;
    if (categories.includes(trimmed)) {
      setForm({ ...form, category: trimmed });
    } else {
      const updated = [...categories, trimmed];
      setCategories(updated);
      localStorage.setItem("catalogueCategories", JSON.stringify(updated));
      setForm({ ...form, category: trimmed });
    }
    setNewCategoryInput("");
  };

  const resetForm = () => {
    setForm({ title: "", description: "", category: "", file: null });
    setEditingId(null);
  };

  const inputCls =
    "w-full px-4 py-2.5 border-2 border-[#ede0f7] rounded-lg text-sm text-[#3a0f45] outline-none focus:border-[#7B1F8A] transition-colors";

  return (
    <div className="space-y-10">
      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[#ede0f7] p-7 shadow-sm"
        style={{ borderTop: "4px solid #7B1F8A" }}
      >
        <h2 className="text-lg font-semibold text-[#3a0f45] mb-4">
          {editingId ? "Update Catalogue" : "Add New Catalogue"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Catalogue Title"
              required
              className={inputCls}
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={inputCls}
            >
              <option value="">Select Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="New category..."
                value={newCategoryInput}
                onChange={(e) => setNewCategoryInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
                className={inputCls}
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-[#7B1F8A] text-white px-3 rounded-lg text-sm font-medium hover:bg-[#5c1a6e] transition-colors whitespace-nowrap"
              >
                + Add
              </button>
            </div>
          </div>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            className={inputCls}
          />
          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              PDF File {editingId && "(leave empty to keep current)"}
            </label>
            <input
              type="file"
              name="file"
              accept="application/pdf"
              onChange={handleChange}
              className={inputCls}
              required={!editingId}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-[#7B1F8A] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#5c1a6e] transition-colors"
            >
              {editingId ? "Update" : "Upload"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="border-2 border-gray-200 text-gray-500 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>

      {/* LIST */}
      <div>
        <h3 className="text-lg font-semibold text-[#3a0f45] mb-4">
          Uploaded Catalogues
        </h3>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : catalogues.length === 0 ? (
          <div className="border-2 border-dashed border-[#ede0f7] rounded-2xl p-10 text-center text-gray-400 text-sm">
            No catalogues uploaded yet.
          </div>
        ) : (
          <div className="space-y-4">
            {catalogues.map((c) => (
              <motion.div
                key={c._id}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-2xl border border-[#ede0f7] p-5 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#f3e8fa] rounded-xl flex items-center justify-center text-2xl">
                    📄
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#3a0f45] text-sm">
                      {c.title}
                    </h4>
                    {c.description && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {c.description}
                      </p>
                    )}
                    <span className="text-[10px] bg-[#f3e8fa] text-[#7B1F8A] px-2 py-0.5 rounded-full mt-1 inline-block">
                      {c.category || "General"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`${API_BASE}${c.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#7B1F8A] border border-[#7B1F8A] px-3 py-1.5 rounded-lg hover:bg-[#7B1F8A] hover:text-white transition-colors"
                  >
                    Preview
                  </a>
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-[#C9A84C] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-90"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-50 text-red-500 border border-red-100 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
