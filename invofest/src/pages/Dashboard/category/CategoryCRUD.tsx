import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CategoryCRUD() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const editingData = location.state?.category;

    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (editingData) {
            setName(editingData.name);
        }
    }, [editingData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const url = editingData 
            ? `https://backend-omega-ten-46.vercel.app/categories/${editingData.id}` 
            : "https://backend-omega-ten-46.vercel.app/categories";
            
        const method = editingData ? 'PATCH' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name })
            });

            if (response.ok) {
                navigate("/Dashboard/category");
            } else {
                const errData = await response.json();
                alert(`Gagal: ${errData.message}`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingData ? "Edit Kategori" : "Tambah Kategori Baru"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
                    <input 
                        type="text" 
                        required 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7A1D3A] outline-none" 
                        placeholder="Contoh: Competition"
                    />
                </div>
                
                <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => navigate("/Dashboard/category")} className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">Batal</button>
                    <button type="submit" disabled={isLoading} className="w-full py-2 bg-[#7A1D3A] text-white rounded-lg font-medium">
                        {isLoading ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
}