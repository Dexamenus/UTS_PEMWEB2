import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function EventCRUD() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const editingData = location.state?.eventData;

    const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
    const [formData, setFormData] = useState({
        name: "", categoryId: "", location: "", dateEvent: "", description: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch("https://backend-omega-ten-46.vercel.app/categories")
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    useEffect(() => {
        if (editingData) {
            const formattedDate = editingData.dateEvent.substring(0, 16);
            setFormData({
                name: editingData.name,
                categoryId: String(editingData.categoryId),
                location: editingData.location,
                dateEvent: formattedDate,
                description: editingData.description
            });
        }
    }, [editingData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const url = editingData 
            ? `https://backend-omega-ten-46.vercel.app/events/${editingData.id}` 
            : "https://backend-omega-ten-46.vercel.app/events";
        const method = editingData ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                navigate("/Dashboard/event");
            } else {
                alert("Gagal menyimpan data event");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingData ? "Edit Event" : "Tambah Event Baru"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Event</label>
                        <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-[#7A1D3A] outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                        <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-[#7A1D3A] outline-none">
                            <option value="" disabled>Pilih Kategori...</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal & Waktu</label>
                        <input type="datetime-local" required value={formData.dateEvent} onChange={e => setFormData({...formData, dateEvent: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-[#7A1D3A] outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                        <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-[#7A1D3A] outline-none" placeholder="Contoh: Lab Kom D.1" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Event</label>
                    <textarea rows={4} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-[#7A1D3A] outline-none"></textarea>
                </div>
                
                <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => navigate("/Dashboard/event")} className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">Batal</button>
                    <button type="submit" disabled={isLoading} className="w-full py-2 bg-[#7A1D3A] text-white rounded-lg font-medium">
                        {isLoading ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
}