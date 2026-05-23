import { useForm } from "react-hook-form";
import { InputPassword } from "../components/InputPassword";
import { InputText } from "../components/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    nama: z.string().min(1, "Nama wajib diisi"),
    email: z.string().email("Format email tidak valid").min(1, "Email wajib diisi"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    passwordConfirm: z.string().min(1, "Konfirmasi password wajib diisi"),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Password tidak cocok",
    path: ["passwordConfirm"], 
});

type FormData = {
    nama: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

export default function RegisterForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
        alert("Akun berhasil dibuat! Silahkan login.");
        navigate("/login"); 
    };
    return (
        <div className="bg-white p-7">
            <div className="text-2xl font-bold mb-4">Register</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputText
                    label="Email"
                    nama="email"
                    error={errors.email?.message}
                    register={register}
                />
                <InputText
                    label="Nama"
                    nama="nama"
                    error={errors.nama?.message}
                    register={register}
                />

                <InputPassword
                    label="Password"
                    nama="password"
                    error={errors.password?.message}
                    register={register}
                />

                <InputPassword
                    label="Confirm Password"
                    nama="passwordConfirm"
                    error={errors.passwordConfirm?.message}
                    register={register}
                />

                <div className="mt-4">
                    <Button label="Register" variant="primary" type="submit"/>
                </div>

                <div>
                    Sudah punya akun? <Link to="/login" className="text-blue-500">Login</Link>
                </div>
            </form>
        </div>
    );
}
