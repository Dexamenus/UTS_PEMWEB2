import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
    id: number;
    name: string;
}

export default function CategoryIndex() {
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    const fetchCategories = () => {
        fetch("https://backend-omega-ten-46.vercel.app/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Gagal load data:", err));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm("Yakin ingin menghapus kategori ini?")) return;

        try {
            const response = await fetch(`https://backend-omega-ten-46.vercel.app/categories/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setCategories(categories.filter(cat => cat.id !== id));
            } else {
                const errData = await response.json();
                alert(`Gagal menghapus: ${errData.message}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Kelola Kategori</h2>
                <button 
                    onClick={() => navigate("/Dashboard/category/create")}
                    className="bg-[#7A1D3A] text-white px-5 py-2 rounded-lg hover:bg-rose-900 transition font-medium"
                >
                    + Tambah Kategori
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">ID</th>
                            <th className="p-4 font-semibold text-gray-600">Nama Kategori</th>
                            <th className="p-4 font-semibold text-gray-600 text-center w-48">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {categories.map((cat, index) => (
                            <tr key={cat.id} className="hover:bg-gray-50 transition">
                                <td className="p-4 text-gray-600">{index + 1}</td>
                                <td className="p-4 font-medium text-gray-800">{cat.name}</td>
                                <td className="p-4 text-center space-x-4">
                                    <button 
                                        onClick={() => navigate("/Dashboard/category/create", { state: { category: cat } })}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(cat.id)}
                                        className="text-red-600 hover:text-red-800 font-medium"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}