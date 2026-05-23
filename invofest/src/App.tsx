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
import EventIndex from "./pages/Dashboard/event/EventIndex";
import PembicraIndex from "./pages/Dashboard/pembicara/PembicraIndex";
import CategoryCreate from "./pages/Dashboard/category/CategoryCreate";
import PembicaraCreate from "./pages/Dashboard/pembicara/PembicaraCreate";
import EventCreate from "./pages/Dashboard/event/EventCreate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayouts />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/talkshow" element={<Talkshow />} />
          <Route path="/Workshop" element={<Workshop />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Register" element={<RegisterForm />} />
          <Route path="/Daftar" element={<Daftar />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayouts />}>
            <Route path="/Dashboard" element={<DashboardIndex />} />
            <Route path="/Dashboard/category" element={<CategoryIndex />} />
            <Route path="/Dashboard/pembicara" element={<PembicraIndex />} />
            <Route path="/Dashboard/event" element={<EventIndex />} />
            <Route path="/Dashboard/category/create" element={<CategoryCreate />} />
            <Route path="/Dashboard/pembicara/pembicaracreate" element={<PembicaraCreate />} />
            <Route path="/Dashboard/event/create" element={<EventCreate />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
export default App;
