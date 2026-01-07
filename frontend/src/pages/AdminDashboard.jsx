import { useEffect, useState } from "react";
import axios from "axios";
import GalleryTab from "../components/GalleryTab";

export default function AdminDashboard({ admin, setAdmin }) {
  const [tab, setTab] = useState("products"); // 'products' or 'gallery'

  // Product states
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // NEW
  const [imageFile, setImageFile] = useState(null); // for file upload
  const [editId, setEditId] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/product");
      setProducts(data);
    } catch (err) {
      alert("Error fetching products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  // Product CRUD
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || (!imageFile && !editId)) return;

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category); // NEW
      if (imageFile) formData.append("image", imageFile);

      if (editId) {
        await axios.put(`http://localhost:4000/api/product/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditId(null);
      } else {
        await axios.post("http://localhost:4000/api/product", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // reset form
      setTitle("");
      setDescription("");
      setCategory(""); // reset
      setImageFile(null);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleEdit = (p) => {
    setEditId(p._id);
    setTitle(p.title);
    setDescription(p.description);
    setCategory(p.category); // NEW
    setImageFile(null); // user can choose to upload new image
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:4000/api/product/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab("products")}
          className={`px-4 py-2 rounded ${
            tab === "products" ? "bg-blue-900 text-white" : "bg-white border"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setTab("gallery")}
          className={`px-4 py-2 rounded ${
            tab === "gallery" ? "bg-blue-900 text-white" : "bg-white border"
          }`}
        >
          Gallery
        </button>
      </div>

      {/* Products Tab */}
      {tab === "products" && (
        <>
          {/* Create / Update Product */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow mb-6 flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="border p-2 rounded"
            />
            {editId && !imageFile && (
              <p className="text-gray-500 text-sm">
                Current image will remain if you don't upload a new one.
              </p>
            )}
            <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
              {editId ? "Update" : "Create"}
            </button>
          </form>

          {/* Product List */}
          <div className="bg-white p-6 rounded shadow overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Title</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Image</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{p.title}</td>
                    <td className="p-2">{p.description}</td>
                    <td className="p-2">{p.category}</td> {/* NEW */}
                    <td className="p-2">
                      <img
                        src={`http://localhost:4000${p.image}`}
                        alt={p.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-400 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "gallery" && <GalleryTab />}
    </div>
  );
}
