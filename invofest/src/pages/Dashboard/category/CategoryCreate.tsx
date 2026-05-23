import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const CategorySchema = z.object({
    nama: z.string().min(1, "Nama kategori harus diisi"),
});

type CategoryValues = z.infer<typeof CategorySchema>;

export default function CategoryCreate() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CategoryValues>({
        resolver: zodResolver(CategorySchema),
    });

    const onSubmit = (data: CategoryValues) => {
        console.log("Kategori disimpan:", data);
        alert("Kategori Berhasil Disimpan!");
    };

    return (
        <div className="p-6  rounded-lg w-full max-w-md bg-white">
            <h1 className="text-2xl font-bold mb-4">Category Create</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Nama</label>
                    <input
                        {...register("nama")}
                        placeholder="Masukkan Nama Kategori"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.nama && (
                        <p className="text-red-500 text-xs mt-1">{errors.nama.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
}
