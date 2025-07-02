import { useState } from "react";
import { useProducts } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function AdminProducts() {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", price: "", description: "", image: "", brand: "" });
  const [editingId, setEditingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, form);
      setEditingId(null);
    } else {
      addProduct({ ...form, price: parseFloat(form.price) });
    }
    setForm({ title: "", price: "", description: "", image: "", brand: "" });
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    deleteProduct(confirmDeleteId);
    setConfirmDeleteId(null);
  };

  if (loading) return <p className="p-4">Cargando productos...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <>
    <Helmet>
      <title>Quantum Mobiles - Administración de Productos</title>
      <meta name="description" content="Administra los productos de Quantum Mobiles." />
    </Helmet>
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Panel de Administración</h2>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <h3 className="text-lg font-semibold">{editingId ? "Editar producto" : "Agregar producto"}</h3>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="brand"
          placeholder="Marca"
          value={form.brand}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="URL de imagen"
          value={form.image}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-4">Productos ({products.length})</h3>
      <ul className="space-y-4">
        {products.map((p) => (
          <li key={p.id} className="border p-4 rounded flex justify-between items-start">
            <div>
              <p className="font-bold">{p.title} - ${p.price}</p>
              <p className="text-sm text-gray-600">{p.brand}</p>
              <p className="text-sm">{p.description.slice(0, 100)}...</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="text-blue-600 underline">
                Editar
              </button>
              <button onClick={() => handleDelete(p.id)} className="text-red-500 underline">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de Confirmación */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4">¿Estás seguro de que deseas eliminar este producto?</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setConfirmDeleteId(null)} className="text-gray-600">
                Cancelar
              </button>
              <button onClick={confirmDelete} className="text-red-600 font-semibold">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
