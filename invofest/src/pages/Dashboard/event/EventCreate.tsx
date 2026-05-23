import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Clock, User, Tag } from "lucide-react";
import { z } from "zod";

export const EventSchema = z.object({
  namaEvent: z.string().min(1, "Nama event wajib diisi"),
  pembicara: z.string().min(1, "Pilih pembicara"),
  tanggal: z.string().min(1, "Tanggal wajib diisi"),
  jam: z.string().min(1, "Jam wajib diisi"),
});

export type EventValues = z.infer<typeof EventSchema>;

export default function EventCreate() {
  const { register, handleSubmit, formState: { errors } } = useForm<EventValues>({
    resolver: zodResolver(EventSchema),
  });

  const onSubmit = (data: EventValues) => {
    console.log("Event disimpan:", data);
    alert("Event Berhasil Dibuat!");
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm w-full max-w-md bg-white">
      <h2 className="text-xl font-bold mb-4">ADD New Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Nama Event */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <Tag size={16} /> Nama Event
          </label>
          <input
            {...register("namaEvent")}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Contoh: Workshop UI/UX"
          />
          {errors.namaEvent && <p className="text-red-500 text-xs mt-1">{errors.namaEvent.message}</p>}
        </div>

        {/* Pembicara */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <User size={16} /> Pembicara
          </label>
          <select
            {...register("pembicara")}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Pembicara</option>
            <option value="pembicara1">Pembicara 1</option>
            <option value="pembicara2">Pembicara 2</option>
          </select>
          {errors.pembicara && <p className="text-red-500 text-xs mt-1">{errors.pembicara.message}</p>}
        </div>

        {/* Tanggal */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <Calendar size={16} /> Tanggal
          </label>
          <input
            type="date"
            {...register("tanggal")}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.tanggal && <p className="text-red-500 text-xs mt-1">{errors.tanggal.message}</p>}
        </div>

        {/* Jam */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <Clock size={16} /> Jam
          </label>
          <input
            type="time"
            {...register("jam")}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.jam && <p className="text-red-500 text-xs mt-1">{errors.jam.message}</p>}
        </div>

        <button 
            type="submit" 
            className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Simpan Event
        </button>
      </form>
    </div>
  );
}