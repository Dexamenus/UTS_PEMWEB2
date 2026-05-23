import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PembicaraCRUD() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Mengecek apakah kita ke halaman ini untuk Edit (ada data yang dikirim via location.state)
    const editingData = location.state?.pembicara;

    const [formData, setFormData] = useState({ name: "", role: "", image: "" });
    const [isLoading, setIsLoading] = useState(false);

    // Mengisi form secara otomatis jika mode Edit
    useEffect(() => {
        if (editingData) {
            setFormData({ 
                name: editingData.name, 
                role: editingData.role, 
                image: editingData.image || "" 
            });
        }
    }, [editingData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const url = editingData 
            ? `https://backend-omega-ten-46.vercel.app/pembicara/${editingData.id}` 
            : "https://backend-omega-ten-46.vercel.app/pembicara";
        
        const method = editingData ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                navigate("/Dashboard/pembicara"); // Kembali ke tabel jika sukses
            } else {
                alert("Gagal menyimpan data pembicara");
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingData ? "Edit Pembicara" : "Tambah Pembicara Baru"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input 
                        type="text" 
                        required 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7A1D3A] outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role / Jabatan</label>
                    <input 
                        type="text" 
                        required 
                        value={formData.role} 
                        onChange={e => setFormData({...formData, role: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7A1D3A] outline-none" 
                        placeholder="Contoh: Software Engineer @ TechCorp" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Foto (Opsional)</label>
                    <input 
                        type="text" 
                        value={formData.image} 
                        onChange={e => setFormData({...formData, image: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7A1D3A] outline-none" 
                        placeholder="https://link-ke-foto.com/gambar.jpg" 
                    />
                </div>
                
                <div className="flex gap-4 pt-4">
                    <button 
                        type="button" 
                        onClick={() => navigate("/Dashboard/pembicara")} 
                        className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition"
                    >
                        Batal
                    </button>
                    <button 
                        type="submit" 
                        disabled={isLoading} 
                        className="w-full py-2 bg-[#7A1D3A] text-white rounded-lg hover:bg-rose-900 font-medium transition disabled:opacity-50"
                    >
                        {isLoading ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
}