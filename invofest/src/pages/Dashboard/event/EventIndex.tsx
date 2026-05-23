import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface EventDetail {
    id: number;
    name: string;
    location: string;
    dateEvent: string;
    category: { name: string };
}

export default function EventIndex() {
    const [events, setEvents] = useState<EventDetail[]>([]);
    const navigate = useNavigate();

    const fetchEvents = () => {
        fetch("https://backend-omega-ten-46.vercel.app/events")
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm("Yakin ingin menghapus event ini?")) return;
        try {
            const res = await fetch(`https://backend-omega-ten-46.vercel.app/events/${id}`, { method: 'DELETE' });
            if (res.ok) fetchEvents();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Kelola Event</h2>
                <button 
                    onClick={() => navigate("/Dashboard/event/create")}
                    className="bg-[#7A1D3A] text-white px-5 py-2 rounded-lg hover:bg-rose-900 font-medium"
                >
                    + Tambah Event
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-gray-600">Nama Event</th>
                            <th className="p-4 text-gray-600">Kategori</th>
                            <th className="p-4 text-gray-600">Tanggal</th>
                            <th className="p-4 text-gray-600">Lokasi</th>
                            <th className="p-4 text-center w-48">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {events.map(event => (
                            <tr key={event.id} className="hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-800">{event.name}</td>
                                <td className="p-4">
                                    <span className="bg-rose-100 text-[#7A1D3A] px-3 py-1 rounded-full text-xs font-semibold">
                                        {event.category?.name || 'Umum'}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-600 text-sm">{new Date(event.dateEvent).toLocaleDateString("id-ID")}</td>
                                <td className="p-4 text-gray-600 text-sm">{event.location}</td>
                                <td className="p-4 text-center space-x-4">
                                    <button 
                                        onClick={() => navigate("/Dashboard/event/create", { state: { eventData: event } })}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(event.id)}
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