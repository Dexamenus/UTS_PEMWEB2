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
        <div className="flex w-full h-screen bg-lime-200">
            {/*Kiri*/}
            <div className="w-64 h-full bg-lime-400 flex flex-col justify-between p-4">
                {/*atas*/}
                <div>
                    <h1 className="text-5xl font-bold text-white text-center">Invofest</h1>
                </div>

                {/*tengah*/}
                <div>
                    <ul className="flex flex-col gap-6 w-full">
                        <li>
                            <Link to="/Dashboard" className="p-4 block text-stone-50 text-xl bg-lime-500 hover:bg-lime-900">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/Dashboard/category" className="p-4 block text-stone-50 text-xl bg-lime-500 hover:bg-lime-900">Category</Link>
                        </li>
                        <li>
                            <Link to="/Dashboard/pembicara" className="p-4 block text-stone-50 text-xl bg-lime-500 hover:bg-lime-900">Pembicara</Link>
                        </li>
                        <li>
                            <Link to="/Dashboard/event" className="p-4 block text-stone-50 text-xl bg-lime-500 hover:bg-lime-900">Event</Link>
                        </li>
                    </ul>
                </div>

                {/*bawah*/}
                <div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full p-4 bg-red-700 rounded-b-full text-stone-100 text-2xl cursor-pointer hover:bg-red-500">Logout</button>
                </div>
            </div>

            {/*Kanan*/}
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    )
}