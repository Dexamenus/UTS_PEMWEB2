import { Link } from "react-router-dom";

export default function EventIndex() {
    return (
        <div>
            <h1>Event</h1>
            <p>Selamat datang di halaman event!</p>
            <Link to="/Dashboard/event/create" className="bg-lime-500 block text-center text-white p-4 rounded hover:bg-lime-600">
                Tambah Event
            </Link>
        </div>
    )
}