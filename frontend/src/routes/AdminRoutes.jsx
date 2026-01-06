import { Routes, Route } from "react-router-dom";
import AdminLayout from "../admin/AdminLayout";
import Dashboard from "../admin/Dashboard";
import PMBAdmin from "../admin/PMBAdmin";
import InspirasiAdmin from "../admin/InspirasiAdmin";
import ProtectedAdmin from "../admin/ProtectedAdmin";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedAdmin />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pmb" element={<PMBAdmin />} />
          <Route path="inspirasi" element={<InspirasiAdmin />} />
        </Route>
      </Route>
    </Routes>
  );
}
