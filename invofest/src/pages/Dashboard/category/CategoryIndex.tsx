import { Link } from "react-router-dom";

export default function CategoryIndex() {
    return (
        <div>
            <h1>Category</h1>
            <p>Selamat datang di halaman kategori!</p>
            <Link to="/Dashboard/category/create" className="bg-lime-500 block text-center text-white p-4 rounded hover:bg-lime-600">
                Tambah Kategori
            </Link>
        </div>
    )
}