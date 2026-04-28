import { useEffect, useState } from "react";
import axios from "axios";
import GalleryTab from "../components/GalleryTab";
import CatalogueTab from "../components/CatalogueTab";
import { useAdmin } from "../context/AdminContext.jsx";

const API_BASE = import.meta.env.VITE_API_URL;

const ICONS = {
  products: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V11" />
    </svg>
  ),
  gallery: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  catalogue: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  logout: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  edit: (
    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  trash: (
    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  menu: (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  search: (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  tag: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#a07820" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  close: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

export default function AdminDashboard() {
  const { admin, logout } = useAdmin();
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [mrp, setMrp] = useState("");
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    const unique = [...new Set(products.map((p) => p.category))];
    setCategories(unique);
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
      const cfg = { withCredentials: true };
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
    if (!categories.includes(trimmed)) setCategories((prev) => [...prev, trimmed]);
    setCategory(trimmed);
    setNewCategoryInput("");
  };

  const handleEdit = (p) => {
    setEditId(p._id); setTitle(p.title); setDescription(p.description);
    setCategory(p.category); setMrp(p.mrp || ""); setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileSidebarOpen(false);
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

  const handleCancelEdit = () => {
    setEditId(null); setTitle(""); setDescription(""); setCategory(""); setImageFile(null); setMrp("");
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryCount = [...new Set(products.map((p) => p.category))].length;

  const NAV_ITEMS = [
    { key: "products", label: "Products" },
    { key: "gallery", label: "Gallery" },
    { key: "catalogue", label: "Catalogue" },
  ];

  // Shared sidebar content
  const SidebarContent = ({ collapsed = false }) => (
    <>
      {/* Logo */}
      <div className="px-5 py-7 border-b border-yellow-800/20">
        <span
          className="block text-[#C9A84C] font-bold tracking-widest text-xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          VOJAL
        </span>
        {!collapsed && (
          <span className="block text-[10px] tracking-[3px] uppercase text-white/30 mt-0.5">
            Admin Panel
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 flex flex-col gap-1">
        {!collapsed && (
          <p className="text-[9px] tracking-[2px] uppercase text-white/20 px-2 mb-2 mt-1">
            Navigation
          </p>
        )}
        {NAV_ITEMS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => { setTab(key); setMobileSidebarOpen(false); }}
            title={collapsed ? label : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left text-[13.5px] font-normal transition-all duration-150 overflow-hidden whitespace-nowrap border
              ${tab === key
                ? "text-white bg-gradient-to-br from-purple-900/70 to-purple-900/40 border-yellow-700/20 font-medium"
                : "text-white/45 border-transparent hover:text-white/85 hover:bg-white/5"
              }`}
          >
            <span className="flex-shrink-0">{ICONS[key]}</span>
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-yellow-800/20">
        <div className={`flex items-center gap-2.5 px-3 py-2.5 mb-2 overflow-hidden ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-700 to-yellow-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {admin?.email?.[0]?.toUpperCase() || "A"}
          </div>
          {!collapsed && (
            <span className="text-[11px] text-white/45 truncate">{admin?.email}</span>
          )}
        </div>
        <button
          onClick={logout}
          title={collapsed ? "Logout" : undefined}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-400/65 text-[13px] hover:text-red-400 hover:bg-red-500/8 w-full text-left transition-all duration-150 overflow-hidden whitespace-nowrap"
        >
          {ICONS.logout}
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        .serif { font-family: 'Cormorant Garamond', serif; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
      `}</style>

      <div className="flex min-h-screen bg-[#f7f4f9]" style={{ fontFamily: "'Outfit', sans-serif" }}>

        {/* ── MOBILE OVERLAY ── */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* ── MOBILE SIDEBAR (drawer) ── */}
        <aside
          className={`fixed top-0 left-0 h-full w-60 bg-[#1a0d21] z-40 flex flex-col transition-transform duration-300 lg:hidden
            ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Close button */}
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="absolute top-4 right-3 text-white/40 hover:text-white/80 transition-colors"
          >
            {ICONS.close}
          </button>
          <SidebarContent collapsed={false} />
        </aside>

        {/* ── DESKTOP SIDEBAR (sticky) ── */}
        <aside
          className={`hidden lg:flex flex-col bg-[#1a0d21] border-r border-yellow-800/15 sticky top-0 h-screen flex-shrink-0 transition-all duration-250
            ${sidebarOpen ? "w-60" : "w-[68px]"}`}
        >
          <SidebarContent collapsed={!sidebarOpen} />
        </aside>

        {/* ── MAIN ── */}
        <div className="flex-1 min-w-0 flex flex-col">

          {/* Topbar */}
          <header className="h-16 bg-white border-b border-[#ebe3f2] flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Mobile hamburger */}
              <button
                className="lg:hidden w-8 h-8 border border-[#ebe3f2] rounded-lg flex items-center justify-center text-[#9e8eae] hover:bg-[#f7f4f9] hover:text-[#1a0d21] transition-all"
                onClick={() => setMobileSidebarOpen(true)}
              >
                {ICONS.menu}
              </button>
              {/* Desktop collapse */}
              <button
                className="hidden lg:flex w-8 h-8 border border-[#ebe3f2] rounded-lg items-center justify-center text-[#9e8eae] hover:bg-[#f7f4f9] hover:text-[#1a0d21] transition-all"
                onClick={() => setSidebarOpen((v) => !v)}
              >
                {ICONS.menu}
              </button>
              <span
                className="serif text-xl font-semibold text-[#1a0d21] capitalize tracking-wide"
              >
                {tab}
              </span>
            </div>


          </header>

          {/* Content */}
          <main className="p-4 sm:p-6 lg:p-8 flex-1">
            {tab === "products" && (
              <>
                {/* Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-7">
                  <div className="bg-white border border-[#ebe3f2] rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 text-[#7B1F8A]">
                      {ICONS.products}
                    </div>
                    <div>
                      <div className="serif text-3xl font-bold text-[#1a0d21] leading-none">{products.length}</div>
                      <div className="text-[11.5px] text-[#9e8eae] mt-1">Total Products</div>
                    </div>
                  </div>
                  <div className="bg-white border border-[#ebe3f2] rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center flex-shrink-0">
                      {ICONS.tag}
                    </div>
                    <div>
                      <div className="serif text-3xl font-bold text-[#1a0d21] leading-none">{categoryCount}</div>
                      <div className="text-[11.5px] text-[#9e8eae] mt-1">Categories</div>
                    </div>
                  </div>
                </div>

                {/* Form Card */}
                <div className="bg-white border border-[#ebe3f2] rounded-2xl p-5 sm:p-7 mb-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-5 border-b border-[#ebe3f2]">
                    <span className="serif text-lg font-semibold text-[#1a0d21]">
                      {editId ? "Edit Product" : "Add New Product"}
                    </span>
                    {editId && (
                      <span className="text-[11px] bg-yellow-50 text-yellow-700 border border-yellow-200 px-2.5 py-1 rounded-md font-medium">
                        Editing Mode
                      </span>
                    )}
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Row 1: 3 cols → stacks on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-medium text-[#6b5c7a] uppercase tracking-wider">Product Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Water Tap"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          className="px-3.5 py-2.5 border-[1.5px] border-[#ebe3f2] rounded-xl text-[13.5px] text-[#1a0d21] outline-none focus:border-[#7B1F8A] transition-colors w-full placeholder-[#9e8eae]"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-medium text-[#6b5c7a] uppercase tracking-wider">Category</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                          className="px-3.5 py-2.5 border-[1.5px] border-[#ebe3f2] rounded-xl text-[13.5px] text-[#1a0d21] outline-none focus:border-[#7B1F8A] transition-colors w-full bg-white"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          <option value="">Select category</option>
                          {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
                        <label className="text-[11px] font-medium text-[#6b5c7a] uppercase tracking-wider">Add New Category</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="New category..."
                            value={newCategoryInput}
                            onChange={(e) => setNewCategoryInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCategory(); } }}
                            className="px-3.5 py-2.5 border-[1.5px] border-[#ebe3f2] rounded-xl text-[13.5px] text-[#1a0d21] outline-none focus:border-[#7B1F8A] transition-colors w-full placeholder-[#9e8eae]"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                          />
                          <button
                            type="button"
                            onClick={handleAddCategory}
                            className="flex-shrink-0 px-3.5 py-2.5 bg-[#7B1F8A] text-white rounded-xl text-[13px] font-medium hover:bg-[#9b35a8] transition-colors whitespace-nowrap"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Row 2: 2 cols */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-medium text-[#6b5c7a] uppercase tracking-wider">MRP (₹)</label>
                        <input
                          type="number"
                          placeholder="e.g. 1499"
                          value={mrp}
                          onChange={(e) => setMrp(e.target.value)}
                          className="px-3.5 py-2.5 border-[1.5px] border-[#ebe3f2] rounded-xl text-[13.5px] text-[#1a0d21] outline-none focus:border-[#7B1F8A] transition-colors w-full placeholder-[#9e8eae]"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-medium text-[#6b5c7a] uppercase tracking-wider">Product Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImageFile(e.target.files[0])}
                          className="px-3.5 py-2 border-[1.5px] border-dashed border-[#ebe3f2] rounded-xl text-[13px] text-[#9e8eae] outline-none focus:border-[#7B1F8A] transition-colors w-full bg-[#f7f4f9] cursor-pointer"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        />
                        {editId && !imageFile && (
                          <p className="text-[11.5px] text-[#9e8eae] mt-1">Current image will be kept if no new file is selected.</p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-medium text-[#6b5c7a] uppercase tracking-wider">Description</label>
                      <input
                        type="text"
                        placeholder="Short product description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="px-3.5 py-2.5 border-[1.5px] border-[#ebe3f2] rounded-xl text-[13.5px] text-[#1a0d21] outline-none focus:border-[#7B1F8A] transition-colors w-full placeholder-[#9e8eae]"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2.5 mt-5 pt-5 border-t border-[#ebe3f2]">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#7B1F8A] text-white rounded-xl text-[13.5px] font-medium hover:bg-[#9b35a8] transition-colors"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {editId ? "Update Product" : "Create Product"}
                      </button>
                      {editId && (
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-6 py-2.5 bg-transparent text-[#6b5c7a] border-[1.5px] border-[#ebe3f2] rounded-xl text-[13.5px] font-medium hover:bg-[#f7f4f9] hover:text-[#1a0d21] transition-all"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {tab === "products" && (
                  <div className="flex items-center gap-2 bg-[#ffffff] border border-[#ebe3f2] rounded-xl px-3 py-2 w-full sm:w-full mb-2">
                    <span className="text-[#9e8eae] flex-shrink-0">{ICONS.search}</span>
                    <input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-none bg-transparent outline-none text-[13px] text-[#1a0d21] w-full placeholder-[#9e8eae]"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    />
                  </div>
                )}
                {/* Table */}
                <div className="bg-white border border-[#ebe3f2] rounded-2xl overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-[#ebe3f2]">
                    <div className="flex items-center gap-2">
                      <span className="serif text-[17px] font-semibold text-[#1a0d21]">Product Inventory</span>
                      <span className="text-[11px] bg-purple-50 text-[#7B1F8A] px-2.5 py-0.5 rounded-full font-medium">
                        {filteredProducts.length} items
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#fbf8fd] border-b border-[#ebe3f2]">
                          {["Product", "Description", "Category", "MRP", "Image", "Actions"].map((h) => (
                            <th
                              key={h}
                              className="px-4 sm:px-5 py-3 text-left text-[10.5px] font-semibold text-[#9e8eae] uppercase tracking-[0.8px] whitespace-nowrap"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.length === 0 ? (
                          <tr>
                            <td colSpan={6}>
                              <div className="text-center py-16 text-[#9e8eae] text-[13px]">
                                {searchQuery ? "No products match your search." : "No products yet. Add one above."}
                              </div>
                            </td>
                          </tr>
                        ) : (
                          filteredProducts.map((p) => (
                            <tr key={p._id} className="border-b border-purple-50 last:border-b-0 hover:bg-[#fdf9ff] transition-colors">
                              <td className="px-4 sm:px-5 py-3.5">
                                <span className="text-[13.5px] font-medium text-[#1a0d21] whitespace-nowrap">{p.title}</span>
                              </td>
                              <td className="px-4 sm:px-5 py-3.5">
                                <span className="text-[12.5px] text-[#9e8eae] block max-w-[160px] sm:max-w-[200px] truncate">{p.description}</span>
                              </td>
                              <td className="px-4 sm:px-5 py-3.5">
                                <span className="inline-block text-[10.5px] bg-purple-50 text-[#7B1F8A] px-2.5 py-1 rounded-full font-medium whitespace-nowrap">{p.category}</span>
                              </td>
                              <td className="px-4 sm:px-5 py-3.5">
                                <span className="text-[13.5px] font-semibold text-[#1a0d21] whitespace-nowrap">
                                  {p.mrp ? `₹${Number(p.mrp).toLocaleString("en-IN")}` : "—"}
                                </span>
                              </td>
                              <td className="px-4 sm:px-5 py-3.5">
                                <img
                                  src={`${API_BASE}${p.image}`}
                                  alt={p.title}
                                  className="w-11 h-11 object-cover rounded-xl border border-[#ebe3f2]"
                                />
                              </td>
                              <td className="px-4 sm:px-5 py-3.5">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleEdit(p)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-lg text-[12px] font-medium hover:bg-yellow-100 transition-all whitespace-nowrap"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                  >
                                    {ICONS.edit} Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(p._id)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-lg text-[12px] font-medium hover:bg-red-100 transition-all whitespace-nowrap"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                  >
                                    {ICONS.trash} Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {tab === "gallery" && <GalleryTab />}
            {tab === "catalogue" && <CatalogueTab />}
          </main>
        </div>
      </div>
    </>
  );
}