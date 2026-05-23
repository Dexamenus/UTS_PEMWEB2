import { useEffect, useState } from "react";

export default function DashboardIndex() {
    // State untuk menampung jumlah data
    const [stats, setStats] = useState({ events: 0, pembicara: 0, categories: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fungsi untuk mengambil semua data dari backend
        const fetchStats = async () => {
            try {
                // Kita gunakan Promise.all agar ketiga API dipanggil secara bersamaan (paralel) sehingga lebih cepat
                const [resEvents, resPembicara, resCategories] = await Promise.all([
                    fetch("https://backend-omega-ten-46.vercel.app/events"),
                    fetch("https://backend-omega-ten-46.vercel.app/pembicara"),
                    fetch("https://backend-omega-ten-46.vercel.app/categories")
                ]);

                // Mengubah response menjadi JSON
                const eventsData = await resEvents.json();
                const pembicaraData = await resPembicara.json();
                const categoriesData = await resCategories.json();

                // Mengupdate angka di state berdasarkan jumlah data di dalam array (.length)
                setStats({
                    events: eventsData.length || 0,
                    pembicara: pembicaraData.length || 0,
                    categories: categoriesData.length || 0
                });
            } catch (error) {
                console.error("Gagal memuat statistik dashboard:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Dashboard Utama</h2>
                <p className="text-gray-500">Selamat datang kembali di panel admin INVOFEST.</p>
            </div>

            {/* Card Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#7A1D3A]">
                    <h3 className="text-gray-500 font-medium">Total Event</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                        {isLoading ? "..." : stats.events}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-600">
                    <h3 className="text-gray-500 font-medium">Total Pembicara</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                        {isLoading ? "..." : stats.pembicara}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-600">
                    <h3 className="text-gray-500 font-medium">Kategori Acara</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                        {isLoading ? "..." : stats.categories}
                    </p>
                </div>
            </div>
        </div>
    );
}