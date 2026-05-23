import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function DashboardLayouts() {
    const Logout = useAuthStore((state) => state.logout);
    const Navigate = useNavigate();
    
    const handleLogout = () => {
        Logout();
        Navigate("/login");
    };

    return (
        // Latar belakang area konten diubah menjadi abu-abu sangat terang
        <div className="flex w-full h-screen bg-slate-50 font-sans">
            
            {/* Sidebar Kiri - Menggunakan warna Maroon khas INVOFEST */}
            <div className="w-64 h-full bg-[#7A1D3A] flex flex-col shadow-xl z-10">
                
                {/* Atas - Area Logo/Brand */}
                <div className="p-6 border-b border-white/20">
                    <h1 className="text-3xl font-bold text-white text-center tracking-wider">
                        INVOFEST
                    </h1>
                    <p className="text-center text-white/70 text-sm mt-1">Admin Panel</p>
                </div>

                {/* Tengah - Menu Navigasi */}
                <div className="flex-1 py-6 px-4 overflow-y-auto">
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link 
                                to="/Dashboard" 
                                className="px-4 py-3 block text-white/90 text-lg rounded-lg hover:bg-white hover:text-[#7A1D3A] transition-all duration-200 font-medium"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/Dashboard/category" 
                                className="px-4 py-3 block text-white/90 text-lg rounded-lg hover:bg-white hover:text-[#7A1D3A] transition-all duration-200 font-medium"
                            >
                                Category
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/Dashboard/pembicara" 
                                className="px-4 py-3 block text-white/90 text-lg rounded-lg hover:bg-white hover:text-[#7A1D3A] transition-all duration-200 font-medium"
                            >
                                Pembicara
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/Dashboard/event" 
                                className="px-4 py-3 block text-white/90 text-lg rounded-lg hover:bg-white hover:text-[#7A1D3A] transition-all duration-200 font-medium"
                            >
                                Event
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Bawah - Tombol Logout */}
                <div className="p-4 border-t border-white/20">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full py-3 bg-white text-[#7A1D3A] rounded-lg font-bold hover:bg-gray-200 transition-colors shadow-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Kanan - Area Konten Utama */}
            {/* flex-1 memastikan area ini mengambil seluruh sisa lebar layar */}
            <div className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </div>
            
        </div>
    );
}