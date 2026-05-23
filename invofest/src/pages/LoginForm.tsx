import { useForm } from "react-hook-form";
import { InputPassword } from "../components/InputPassword";
import InputText from "../components/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";


const schema = z.object({
    email: z.string().email("Format email tidak valid").min(1, "Email wajib diisi"),
    password: z.string().min(8, "Password minimal 8 karakter"),
});

type FormData = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const navigate = useNavigate();
    const login  = useAuthStore((state) => state.login);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onTouched",
    });

    const onSubmit = (data: FormData) => {
    console.log("Login sukses:", data);
    if (data.email === "24090104@gmail.com" && data.password === "24090104") {
        alert("Login berhasil!");
        login(data.email);
        navigate("/Dashboard", { replace: true });
    } else {
        alert("Login gagal: 24090104@gmail.com / 24090104");
    }
};
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-7 ">
                <div className="text-2xl font-bold mb-4">Login</div>

                <InputText
                    label="Email"
                    nama="email"
                    error={errors.email?.message?.toString()}
                    register={register}
                />

                <InputPassword
                    label="Password"
                    nama="password"
                    error={errors.password?.message}
                    register={register}
                />

                <div className="mt-4">
                    <Button label="Login" variant="primary" type="submit"/>
                </div>

                <div>
                    Belum punya akun? <Link to="/register" className="text-blue-500">Daftar</Link>
                </div>
            </form>
        </div>
    );
}