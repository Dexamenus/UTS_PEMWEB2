import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Pembicara {
    id: number;
    name: string;
    role: string;
}

export default function PembicraIndex() {
    const [pembicara, setPembicara] = useState<Pembicara[]>([]);
    const navigate = useNavigate();

    const fetchPembicara = () => {
        fetch("https://backend-omega-ten-46.vercel.app/pembicara")
            .then(res => res.json())
            .then(data => setPembicara(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchPembicara();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm("Yakin ingin menghapus pembicara ini?")) return;
        try {
            const res = await fetch(`https://backend-omega-ten-46.vercel.app/pembicara/${id}`, { method: 'DELETE' });
            if (res.ok) fetchPembicara();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Kelola Pembicara</h2>
                <button 
                    onClick={() => navigate("/Dashboard/pembicara/pembicaracreate")}
                    className="bg-[#7A1D3A] text-white px-5 py-2 rounded-lg hover:bg-rose-900 font-medium"
                >
                    + Tambah Pembicara
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-gray-600">Nama</th>
                            <th className="p-4 text-gray-600">Role</th>
                            <th className="p-4 text-gray-600 text-center w-48">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {pembicara.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-800">{p.name}</td>
                                <td className="p-4 text-gray-600 text-sm">{p.role}</td>
                                <td className="p-4 text-center space-x-4">
                                    <button 
                                        onClick={() => navigate("/Dashboard/pembicara/pembicaracreate", { state: { pembicara: p } })}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(p.id)}
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