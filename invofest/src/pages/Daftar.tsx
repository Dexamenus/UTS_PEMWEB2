import { useForm } from "react-hook-form";
import { InputPassword } from "../components/InputPassword";
import { InputText } from "../components/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Format email tidak valid").min(1, "Email wajib diisi"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  event: z.string().min(1, "Silahkan pilih event yang ingin diikuti"),
});
type DaftarData = z.infer<typeof schema>;

export function Daftar() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<DaftarData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: DaftarData) => {
    console.log("Data Berhasil Terkirim:", data); // Ini akan muncul jika SEMUA input valid
    alert("Pendaftaran Berhasil!");
    navigate("/"); 
  };

  return (
    <div className="bg-white p-7">
      <h2 className="text-2xl font-bold mb-4">Formulir Pendaftaran</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputText label="Nama" nama="name" register={register} error={errors.name?.message} />
        <InputText label="Email" nama="email" register={register} error={errors.email?.message} />
        <InputPassword label="Password" nama="password" register={register} error={errors.password?.message} />
        
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Pilih Event</label>
          <select {...register("event")} className="border p-2 rounded">
            <option value="">-- Pilih Event --</option>
            <option value="invofest">Invofest</option>
            <option value="ai">Workshop AI</option>
          </select>
          {/* PESAN ERROR WAJIB ADA AGAR TAHU JIKA VALIDASI GAGAL */}
          {errors.event && <span className="text-red-500 text-sm">{errors.event.message}</span>}
        </div>

        <Button type="submit" label="Daftar Sekarang" variant="primary" />
      </form>
    </div>
  );
}

export default Daftar;