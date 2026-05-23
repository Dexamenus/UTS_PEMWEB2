import { Link } from "react-router-dom";

export default function PembicraIndex() {
    return (
        <div>
            <h1>Pembicara</h1>
            <p>Selamat datang di halaman pembicara!</p>
            <Link to="/Dashboard/pembicara/pembicaraCreate" className="bg-lime-500 block text-center text-white p-4 rounded hover:bg-lime-600">
                Tambah Pembicara
            </Link>
        </div>
    )
}