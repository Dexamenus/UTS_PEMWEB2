import { BrowserRouter, Routes, Route } from "react-router-dom";
import Competition from "./pages/Competition";
import Homepage from "./pages/Homepage";
import Seminar from "./pages/Seminar";
import Talkshow from "./pages/Talkshow";
import Workshop from "./pages/Workshop";
import MainLayouts from "./layouts/mainLayouts";
import AuthLayout from "./layouts/AuthLayout";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Daftar from "./pages/Daftar";
import DashboardIndex from "./pages/Dashboard/DashboardIndex";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayouts from "./layouts/DashboardLayouts";
import CategoryIndex from "./pages/Dashboard/category/CategoryIndex";
import PembicraIndex from "./pages/Dashboard/pembicara/PembicraIndex";
import EventIndex from "./pages/Dashboard/event/EventIndex";
import CategoryCRUD from "./pages/Dashboard/category/CategoryCRUD";
import PembicaraCRUD from "./pages/Dashboard/pembicara/PembicaraCRUD";
import EventCRUD from "./pages/Dashboard/event/EventCRUD";
import Biodata from "./pages/Biodata";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rute publik */}
        <Route element={<MainLayouts />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/talkshow" element={<Talkshow />} />
          <Route path="/Workshop" element={<Workshop />} />
          <Route path="/biodata" element={<Biodata />} />
        </Route>

        {/* rute auth */}
        <Route element={<AuthLayout />}>
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Register" element={<RegisterForm />} />
          <Route path="/Daftar" element={<Daftar />} />
        </Route>

        {/* rute terproteksi dashboard admin */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayouts />}>
            <Route path="/Dashboard" element={<DashboardIndex />} />
            
            {/* Navigasi Utama List Tabel */}
            <Route path="/Dashboard/category" element={<CategoryIndex />} />
            <Route path="/Dashboard/pembicara" element={<PembicraIndex />} />
            <Route path="/Dashboard/event" element={<EventIndex />} />
            
            {/* Navigasi Aksi Form CRUD */}
            <Route path="/Dashboard/category/create" element={<CategoryCRUD />} />
            <Route path="/Dashboard/pembicara/create" element={<PembicaraCRUD />} />
            <Route path="/Dashboard/event/create" element={<EventCRUD />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
export default App;