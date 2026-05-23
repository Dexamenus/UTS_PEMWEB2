import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


const PembicaraSchema = z.object({
  nama: z.string().min(2, "Nama harus minimal 2 karakter"),
  role: z.string().min(2, "Role harus minimal 2 karakter"),
  foto: z.string().url("Format URL tidak valid"),
});
type PembicaraValues = z.infer<typeof PembicaraSchema>;
export default function PembicaraCreate() {
  const { register, handleSubmit, formState: { errors } } = useForm<PembicaraValues>({
    resolver: zodResolver(PembicaraSchema),
  });

  const onSubmit = (data: PembicaraValues) => {
    console.log("Pembicara disimpan:", data);
    alert("Pembicara Berhasil Disimpan!");
  };

  return (
    <div className="p-6 rounded-lg w-full bg-white max-w-md">
    <h1 className="text-2xl font-bold mb-4">Tambah Pembicara</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama</label>
          <input
            {...register("nama")}
            className="w-full p-2 border rounded"
          />
          {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <input
            {...register("role")}
            className="w-full p-2 border rounded"
          />
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Foto</label>
          <input
            {...register("foto")}
            placeholder="http://url-foto.com/gambar.jpg"
            className="w-full p-2 border rounded"
          />
          {errors.foto && <p className="text-red-500 text-xs mt-1">{errors.foto.message}</p>}
        </div>

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Simpan
        </button>
      </form>
    </div>
  );
}