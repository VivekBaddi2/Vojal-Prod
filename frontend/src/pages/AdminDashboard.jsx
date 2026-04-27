import { useEffect, useState } from "react";
import axios from "axios";
import GalleryTab from "../components/GalleryTab";
import CatalogueTab from "../components/CatalogueTab";
import { useAdmin } from "../context/AdminContext.jsx";

const API_BASE = import.meta.env.VITE_API_URL;

const ICONS = {
  products: (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V11"
      />
    </svg>
  ),
  gallery: (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  catalogue: (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
  logout: (
    <svg
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  ),
  edit: (
    <svg
      width="13"
      height="13"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  ),
  trash: (
    <svg
      width="13"
      height="13"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
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
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/product`, {
        withCredentials: true,
      });
      setProducts(data);
    } catch {
      alert("Error fetching products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
      setTitle("");
      setDescription("");
      setCategory("");
      setImageFile(null);
      setMrp("");
      fetchProducts();
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired.");
        logout();
      } else alert(err.response?.data?.message || "Error");
    }
  };

  const handleAddCategory = () => {
    const trimmed = newCategoryInput.trim();
    if (!trimmed) return;
    if (!categories.includes(trimmed))
      setCategories((prev) => [...prev, trimmed]);
    setCategory(trimmed);
    setNewCategoryInput("");
  };

  const handleEdit = (p) => {
    setEditId(p._id);
    setTitle(p.title);
    setDescription(p.description);
    setCategory(p.category);
    setMrp(p.mrp || "");
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API_BASE}/api/product/${id}`, {
        withCredentials: true,
      });
      fetchProducts();
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired.");
        logout();
      }
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
    setCategory("");
    setImageFile(null);
    setMrp("");
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const categoryCount = [...new Set(products.map((p) => p.category))].length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          --sidebar-bg: #1a0d21;
          --sidebar-border: rgba(201,168,76,0.15);
          --accent-gold: #C9A84C;
          --accent-purple: #7B1F8A;
          --accent-purple-light: #9b35a8;
          --bg-main: #f7f4f9;
          --bg-card: #ffffff;
          --text-primary: #1a0d21;
          --text-secondary: #6b5c7a;
          --text-muted: #9e8eae;
          --border-color: #ebe3f2;
          --danger: #e53e3e;
          --danger-light: #fff5f5;
          --success: #38a169;
        }

        * { box-sizing: border-box; }

        .dash-root {
          display: flex;
          min-height: 100vh;
          background: var(--bg-main);
          font-family: 'Outfit', sans-serif;
        }

        /* ── SIDEBAR ── */
        .sidebar {
          width: 240px;
          min-height: 100vh;
          background: var(--sidebar-bg);
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--sidebar-border);
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          flex-shrink: 0;
          transition: width 0.25s ease;
        }

        .sidebar.collapsed { width: 68px; }

        .sidebar-logo {
          padding: 28px 20px 24px;
          border-bottom: 1px solid var(--sidebar-border);
        }

        .logo-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--accent-gold);
          letter-spacing: 2px;
          display: block;
          white-space: nowrap;
        }

        .logo-sub {
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-top: 2px;
          display: block;
          white-space: nowrap;
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-label {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          padding: 0 8px;
          margin-bottom: 8px;
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.18s ease;
          color: rgba(255,255,255,0.45);
          font-size: 13.5px;
          font-weight: 400;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
        }

        .nav-item:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.05); }

        .nav-item.active {
          color: #fff;
          background: linear-gradient(135deg, rgba(123,31,138,0.7), rgba(123,31,138,0.4));
          border: 1px solid rgba(201,168,76,0.2);
          font-weight: 500;
        }

        .nav-item .nav-icon { flex-shrink: 0; }

        .nav-text { overflow: hidden; }

        .sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid var(--sidebar-border);
        }

        .admin-info {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          margin-bottom: 8px;
          overflow: hidden;
        }

        .admin-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-gold));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }

        .admin-email {
          font-size: 11px;
          color: rgba(255,255,255,0.45);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          color: rgba(255,100,100,0.65);
          font-size: 13px;
          font-weight: 400;
          cursor: pointer;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          transition: all 0.18s;
          white-space: nowrap;
          overflow: hidden;
        }

        .logout-btn:hover { color: #ff6b6b; background: rgba(255,100,100,0.08); }

        /* ── MAIN ── */
        .main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .topbar {
          height: 64px;
          background: var(--bg-card);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .collapse-btn {
          width: 32px;
          height: 32px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all 0.15s;
        }
        .collapse-btn:hover { background: var(--bg-main); color: var(--text-primary); }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.3px;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-main);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 7px 14px;
          width: 260px;
        }

        .search-bar input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 13px;
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          width: 100%;
        }

        .search-bar input::placeholder { color: var(--text-muted); }

        /* ── CONTENT ── */
        .content {
          padding: 28px 32px;
          flex: 1;
        }

        /* ── STAT CARDS ── */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
        }

        .stat-label {
          font-size: 11.5px;
          color: var(--text-muted);
          margin-top: 3px;
          letter-spacing: 0.3px;
        }

        /* ── FORM CARD ── */
        .form-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 24px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--border-color);
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .edit-badge {
          font-size: 11px;
          background: rgba(201,168,76,0.12);
          color: var(--accent-gold);
          border: 1px solid rgba(201,168,76,0.25);
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 500;
        }

        .form-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        .field-group { display: flex; flex-direction: column; gap: 6px; }

        .field-label {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-secondary);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .field-input {
          padding: 10px 14px;
          border: 1.5px solid var(--border-color);
          border-radius: 10px;
          font-size: 13.5px;
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          outline: none;
          transition: border-color 0.15s;
          background: #fff;
          width: 100%;
        }

        .field-input:focus { border-color: var(--accent-purple); }
        .field-input::placeholder { color: var(--text-muted); }

        .field-input-file {
          padding: 9px 14px;
          border: 1.5px dashed var(--border-color);
          border-radius: 10px;
          font-size: 13px;
          color: var(--text-muted);
          font-family: 'Outfit', sans-serif;
          outline: none;
          transition: border-color 0.15s;
          background: var(--bg-main);
          width: 100%;
          cursor: pointer;
        }
        .field-input-file:focus { border-color: var(--accent-purple); }

        .cat-row { display: flex; gap: 8px; }
        .cat-add-btn {
          flex-shrink: 0;
          padding: 10px 14px;
          background: var(--accent-purple);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s;
          font-family: 'Outfit', sans-serif;
        }
        .cat-add-btn:hover { background: var(--accent-purple-light); }

        .form-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }

        .btn-primary {
          padding: 10px 24px;
          background: var(--accent-purple);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s;
          font-family: 'Outfit', sans-serif;
        }
        .btn-primary:hover { background: var(--accent-purple-light); }

        .btn-secondary {
          padding: 10px 24px;
          background: transparent;
          color: var(--text-secondary);
          border: 1.5px solid var(--border-color);
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'Outfit', sans-serif;
        }
        .btn-secondary:hover { background: var(--bg-main); color: var(--text-primary); }

        /* ── TABLE ── */
        .table-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }

        .table-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .table-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .count-badge {
          font-size: 11px;
          background: rgba(123,31,138,0.08);
          color: var(--accent-purple);
          padding: 3px 9px;
          border-radius: 20px;
          font-weight: 500;
          margin-left: 8px;
        }

        table { width: 100%; border-collapse: collapse; }

        thead tr {
          background: #fbf8fd;
          border-bottom: 1px solid var(--border-color);
        }

        th {
          padding: 12px 20px;
          font-size: 10.5px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          text-align: left;
        }

        tbody tr {
          border-bottom: 1px solid #f5eff9;
          transition: background 0.12s;
        }

        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: #fdf9ff; }

        td { padding: 14px 20px; }

        .td-title {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .td-desc {
          font-size: 12.5px;
          color: var(--text-muted);
          max-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cat-pill {
          display: inline-block;
          font-size: 10.5px;
          background: rgba(123,31,138,0.07);
          color: var(--accent-purple);
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 500;
        }

        .mrp-text {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .product-img {
          width: 44px;
          height: 44px;
          object-fit: cover;
          border-radius: 10px;
          border: 1px solid var(--border-color);
        }

        .action-cell { display: flex; gap: 8px; align-items: center; }

        .btn-edit {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          background: rgba(201,168,76,0.1);
          color: #a07820;
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'Outfit', sans-serif;
        }
        .btn-edit:hover { background: rgba(201,168,76,0.2); }

        .btn-delete {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          background: var(--danger-light);
          color: var(--danger);
          border: 1px solid rgba(229,62,62,0.15);
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'Outfit', sans-serif;
        }
        .btn-delete:hover { background: #fee2e2; }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-muted);
          font-size: 13px;
        }

        .hint-text {
          font-size: 11.5px;
          color: var(--text-muted);
          margin-top: 4px;
        }
      `}</style>

      <div className="dash-root">
        {/* ── SIDEBAR ── */}
        <aside className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
          <div className="sidebar-logo">
            <span className="logo-mark">VOJAL</span>
            {sidebarOpen && <span className="logo-sub">Admin Panel</span>}
          </div>

          <nav className="sidebar-nav">
            {sidebarOpen && <p className="nav-label">Navigation</p>}
            {[
              { key: "products", label: "Products" },
              { key: "gallery", label: "Gallery" },
              { key: "catalogue", label: "Catalogue" },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`nav-item ${tab === key ? "active" : ""}`}
                onClick={() => setTab(key)}
                title={!sidebarOpen ? label : undefined}
              >
                <span className="nav-icon">{ICONS[key]}</span>
                {sidebarOpen && <span className="nav-text">{label}</span>}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="admin-info">
              <div className="admin-avatar">
                {admin?.email?.[0]?.toUpperCase() || "A"}
              </div>
              {sidebarOpen && (
                <span className="admin-email">{admin?.email}</span>
              )}
            </div>
            <button
              className="logout-btn"
              onClick={logout}
              title={!sidebarOpen ? "Logout" : undefined}
            >
              {ICONS.logout}
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="main">
          {/* Topbar */}
          <header className="topbar">
            <div className="topbar-left">
              <button
                className="collapse-btn"
                onClick={() => setSidebarOpen((v) => !v)}
              >
                <svg
                  width="15"
                  height="15"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <span
                className="page-title"
                style={{ textTransform: "capitalize" }}
              >
                {tab}
              </span>
            </div>
            {tab === "products" && (
              <div className="search-bar">
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ color: "#9e8eae", flexShrink: 0 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
          </header>

          {/* Content */}
          <main className="content">
            {tab === "products" && (
              <>
                {/* Stat Cards */}
                <div className="stats-row">
                  <div className="stat-card">
                    <div
                      className="stat-icon"
                      style={{ background: "rgba(123,31,138,0.08)" }}
                    >
                      {ICONS.products}
                    </div>
                    <div>
                      <div className="stat-value">{products.length}</div>
                      <div className="stat-label">Total Products</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div
                      className="stat-icon"
                      style={{ background: "rgba(201,168,76,0.1)" }}
                    >
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#a07820"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="stat-value">{categoryCount}</div>
                      <div className="stat-label">Categories</div>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="form-card">
                  <div className="card-header">
                    <span className="card-title">
                      {editId ? "Edit Product" : "Add New Product"}
                    </span>
                    {editId && <span className="edit-badge">Editing Mode</span>}
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="form-grid-3" style={{ marginBottom: 16 }}>
                      <div className="field-group">
                        <label className="field-label">Product Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Silk Kurta"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="field-input"
                          required
                        />
                      </div>
                      <div className="field-group">
                        <label className="field-label">Category</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="field-input"
                          required
                        >
                          <option value="">Select category</option>
                          {categories.map((c, i) => (
                            <option key={i} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="field-group">
                        <label className="field-label">Add New Category</label>
                        <div className="cat-row">
                          <input
                            type="text"
                            placeholder="New category..."
                            value={newCategoryInput}
                            onChange={(e) =>
                              setNewCategoryInput(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddCategory();
                              }
                            }}
                            className="field-input"
                          />
                          <button
                            type="button"
                            onClick={handleAddCategory}
                            className="cat-add-btn"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="form-grid-2" style={{ marginBottom: 16 }}>
                      <div className="field-group">
                        <label className="field-label">MRP (₹)</label>
                        <input
                          type="number"
                          placeholder="e.g. 1499"
                          value={mrp}
                          onChange={(e) => setMrp(e.target.value)}
                          className="field-input"
                        />
                      </div>
                      <div className="field-group">
                        <label className="field-label">Product Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImageFile(e.target.files[0])}
                          className="field-input-file"
                        />
                        {editId && !imageFile && (
                          <p className="hint-text">
                            Current image will be kept if no new file is
                            selected.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="field-group">
                      <label className="field-label">Description</label>
                      <input
                        type="text"
                        placeholder="Short product description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="field-input"
                        required
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn-primary">
                        {editId ? "Update Product" : "Create Product"}
                      </button>
                      {editId && (
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Table */}
                <div className="table-card">
                  <div className="table-toolbar">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span className="table-title">Product Inventory</span>
                      <span className="count-badge">
                        {filteredProducts.length} items
                      </span>
                    </div>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        {[
                          "Product",
                          "Description",
                          "Category",
                          "MRP",
                          "Image",
                          "Actions",
                        ].map((h) => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan={6}>
                            <div className="empty-state">
                              {searchQuery
                                ? "No products match your search."
                                : "No products yet. Add one above."}
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((p) => (
                          <tr key={p._id}>
                            <td>
                              <span className="td-title">{p.title}</span>
                            </td>
                            <td>
                              <span className="td-desc">{p.description}</span>
                            </td>
                            <td>
                              <span className="cat-pill">{p.category}</span>
                            </td>
                            <td>
                              <span className="mrp-text">
                                {p.mrp
                                  ? `₹${Number(p.mrp).toLocaleString("en-IN")}`
                                  : "—"}
                              </span>
                            </td>
                            <td>
                              <img
                                src={`${API_BASE}${p.image}`}
                                alt={p.title}
                                className="product-img"
                              />
                            </td>
                            <td>
                              <div className="action-cell">
                                <button
                                  className="btn-edit"
                                  onClick={() => handleEdit(p)}
                                >
                                  {ICONS.edit} Edit
                                </button>
                                <button
                                  className="btn-delete"
                                  onClick={() => handleDelete(p._id)}
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
