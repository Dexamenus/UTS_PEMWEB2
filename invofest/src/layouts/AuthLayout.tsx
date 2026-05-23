import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-2 items-center min-h-screen">
      <div className="bg-gray-50 h-screen flex flex-col items-center justify-center">
        <img
          src="https://www.invofest-harkatnegeri.com/assets/text-image.png"
          alt=""
          className="w-96"
        />
        <h1 className="text-2xl font-bold mt-4">INFORMATIC VOCATIONAL FEST</h1>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
