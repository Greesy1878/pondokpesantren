import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function InspirasiAdmin() {
  axios.defaults.withCredentials = false;
  const API_BASE = "http://localhost:8000";

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Ruang Pena");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const fileInputRef = useRef();

  const fetchList = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/inspirasi`);
      setList(res.data);
    } catch (err) {
      console.error("Fetch inspirasi error:", err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // no image upload for Inspirasi

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setCategory("");
    setContent("");
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert("Masukkan judul");
    try {
      setLoading(true);
      await axios.post(`${API_BASE}/api/inspirasi`, {
        title,
        category,
        author,
        content,
      });

      alert("Inspirasi berhasil ditambahkan");
      resetForm();
      fetchList();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan inspirasi");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus item inspirasi ini?")) return;
    try {
      setLoading(true);
      await axios.delete(`${API_BASE}/api/inspirasi/${id}`);
      fetchList();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (item) => {
    const newTitle = prompt("Judul baru:", item.title);
    if (newTitle === null) return;
    const newAuthor = prompt("Author:", item.author || "") || item.author;
    const newCategory = prompt("Kategori:", item.category || "") || item.category;
    const newContent = prompt("Konten:", item.content || "") || item.content;
    try {
      setLoading(true);
      await axios.put(`${API_BASE}/api/inspirasi/${item.id}`, {
        title: newTitle,
        author: newAuthor,
        category: newCategory,
        content: newContent,
      });
      fetchList();
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inspirasi Admin</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Judul</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option>Ruang Pena</option>
                <option>Kisah Inspiratif</option>
                <option>Tadabbur</option>
                <option>One Day Motivation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Konten</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
                rows={4}
              />
            </div>

            {/* No image input for Inspirasi */}

            <div className="flex justify-end">
              <Button type="submit" disabled={loading} className="bg-[#80916f] hover:bg-[#6f7f60]">
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Daftar Inspirasi</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Judul</th>
                <th className="p-2">Kategori</th>
                <th className="p-2">Author</th>
                <th className="p-2">Konten</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-2 text-center text-gray-500">
                    Tidak ada inspirasi
                  </td>
                </tr>
              )}
                  {list.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.title}</td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2">{item.author}</td>
                      <td className="p-2">
                        <div className="text-sm text-gray-700 max-w-md truncate">{item.content}</div>
                      </td>
                  <td className="p-2 space-x-2">
                    <button onClick={() => handleEdit(item)} className="text-blue-600">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
