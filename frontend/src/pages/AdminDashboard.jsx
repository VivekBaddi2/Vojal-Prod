import { useEffect, useState } from "react";
import axios from "axios";
import GalleryTab from "../components/GalleryTab";
import CatalogueTab from "../components/CatalogueTab";
import { useAdmin } from "../context/AdminContext.jsx";

const API_BASE = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const { admin, logout } = useAdmin(); // ✅ from context
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [mrp, setMrp] = useState("");
  
const [newCategoryInput, setNewCategoryInput] = useState("");  // ADD THIS
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/product`, { withCredentials: true });
      setProducts(data);
    } catch {
      alert("Error fetching products");
    }
  };

  useEffect(() => { fetchProducts(); }, []);
  useEffect(() => {
    const saved = localStorage.getItem("productCategories");
const savedCategories = saved ? JSON.parse(saved) : [];
const unique = [...new Set(products.map(p => p.category))];
const merged = [...new Set([...savedCategories, ...unique])];
setCategories(merged);
localStorage.setItem("productCategories", JSON.stringify(merged));
  }, [products]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || (!imageFile && !editId)) return;
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("mrp", mrp);
      if (imageFile) formData.append("image", imageFile);
      const cfg = {
        withCredentials: true
      };
      if (editId) {
        await axios.put(`${API_BASE}/api/product/${editId}`, formData, cfg);
        setEditId(null);
      } else {
        await axios.post(`${API_BASE}/api/product`, formData, cfg);
      }
      setTitle(""); setDescription(""); setCategory(""); setImageFile(null); setMrp("");
      fetchProducts();
    } catch (err) {
      if (err.response?.status === 401) { alert("Session expired."); logout(); }
      else alert(err.response?.data?.message || "Error");
    }
  };
  const handleAddCategory = () => {
  const trimmed = newCategoryInput.trim();
  if (!trimmed) return;
  if (categories.includes(trimmed)) {
    setCategory(trimmed);
  } else {
    const updated = [...categories, trimmed];
    setCategories(updated);
   localStorage.setItem("productCategories", JSON.stringify(updated));
    setCategory(trimmed);
  }
  setNewCategoryInput("");
};
  

  const handleEdit = (p) => {
    setEditId(p._id);
    setTitle(p.title);
    setDescription(p.description);
    setCategory(p.category);
    setMrp(p.mrp || "");
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API_BASE}/api/product/${id}`, { withCredentials: true });
      fetchProducts();
    } catch (err) {
      if (err.response?.status === 401) { alert("Session expired."); logout(); }
    }
  };

  const inputCls = "w-full px-4 py-2.5 border-2 border-[#ede0f7] rounded-lg text-sm text-[#3a0f45] outline-none focus:border-[#7B1F8A] transition-colors";

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');`}</style>
      <div className="min-h-screen bg-[#f5f5f7] p-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-semibold text-[#3a0f45]">
                Vojal Dashboard
              </h1>
              <p className="text-xs text-gray-400 mt-1">Logged in as: {admin?.email}</p>
            </div>
            <button
              onClick={logout}
              className="bg-white text-[#7B1F8A] border-2 border-[#7B1F8A] px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#7B1F8A] hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>

          {/* TABS */}
          <div className="flex gap-3 mb-6">
            {["products", "gallery", "catalogue"].map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-lg text-sm font-medium border-2 capitalize transition-all ${tab === t
                    ? "bg-[#7B1F8A] text-white border-[#7B1F8A]"
                    : "bg-white text-[#7B1F8A] border-[#7B1F8A] hover:bg-[#7B1F8A] hover:text-white"
                  }`}>
                {t}
              </button>
            ))}
          </div>

          {tab === "products" && (
            <>
              {/* FORM */}
              <form onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-[#ede0f7] p-7 mb-6 space-y-4 shadow-sm"
                style={{ borderTop: "4px solid #7B1F8A" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-semibold text-[#3a0f45] text-lg">
                  {editId ? "Update Product" : "Add New Product"}
                </h2>
            <div className="grid grid-cols-3 gap-4">
  <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className={inputCls}
    required
  />
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className={inputCls}
    required
  >
    <option value="">Select Category</option>
    {categories.map((c, i) => (
      <option key={i} value={c}>{c}</option>
    ))}
  </select>
  <div className="flex gap-2">
    <input
      type="text"
      placeholder="New category..."
      value={newCategoryInput}
      onChange={(e) => setNewCategoryInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") { e.preventDefault(); handleAddCategory(); }
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
                  type="number"
                  placeholder="MRP (₹)"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  className={inputCls}
                />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} required />
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className={inputCls} />
                {editId && !imageFile && (
                  <p className="text-gray-400 text-xs">Current image will remain if you don't upload a new one.</p>
                )}
                <div className="flex gap-3">
                  <button type="submit" className="bg-[#7B1F8A] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#5c1a6e] transition-colors">
                    {editId ? "Update" : "Create"}
                  </button>
                  {editId && (
                    <button type="button"
                      onClick={() => { setEditId(null); setTitle(""); setDescription(""); setCategory(""); setImageFile(null); setMrp(""); }}
                      className="border-2 border-gray-200 text-gray-500 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              {/* TABLE */}
              <div className="bg-white rounded-2xl border border-[#ede0f7] overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#faf5ff] border-b border-[#ede0f7]">
                      {["Title", "Description", "Category", "MRP", "Image", "Actions"].map((h) => (
                        <th key={h} className="p-4 text-[11px] text-[#7B1F8A] font-medium uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p._id} className="border-b border-[#f5eef8] hover:bg-[#fdf9ff] transition-colors">
                        <td className="p-4 text-sm font-medium text-[#3a0f45]">{p.title}</td>
                        <td className="p-4 text-sm text-gray-400 max-w-xs truncate">{p.description}</td>
                        <td className="p-4">
                          <span className="text-[10px] bg-[#f3e8fa] text-[#7B1F8A] px-2.5 py-1 rounded-full">{p.category}</span>
                        </td>
                        <td className="p-4 text-sm text-[#3a0f45] font-medium">
                          {p.mrp ? `₹${p.mrp}` : "—"}
                        </td>
                        <td className="p-4">
                          <img src={`${API_BASE}${p.image}`} alt={p.title} className="h-11 w-11 object-cover rounded-lg border border-[#ede0f7]" />
                        </td>
                        <td className="p-4 space-x-2">
                          <button onClick={() => handleEdit(p)} className="bg-[#C9A84C] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity">Edit</button>
                          <button onClick={() => handleDelete(p._id)} className="bg-red-50 text-red-500 border border-red-100 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {tab === "gallery" && <GalleryTab />}

          {tab === "catalogue" && <CatalogueTab />}
        </div>
      </div>
    </>
  );
}