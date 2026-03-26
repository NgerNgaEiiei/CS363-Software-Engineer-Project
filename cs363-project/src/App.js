import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import AdminMenuPage from "./pages/AdminMenuPage";
import MenuPreview from "./pages/MenuPreview";
import AddDetail from "./pages/AddDetail";
import AdminSettingPage from "./pages/AdminSettingPage";
import AdminEditMenuPage from "./pages/AdminEditMenuPage";

// ── Route definitions ────────────────────────────────────────────────────────
// เพิ่ม Route ใหม่ได้โดย import Page แล้วเพิ่ม <Route> ด้านล่าง
// ตัวอย่าง: <Route path="/order-history" element={<OrderHistoryPage />} />

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/admin" element={<AdminMenuPage />} />
        <Route path="/preview" element={<MenuPreview />} />
        <Route path="/add-detail" element={<AddDetail />} />
        <Route path="/admin/setting" element={<AdminSettingPage />} />
        <Route path="/admin-edit-menu/:categoryId" element={<AdminEditMenuPage />} />
      </Routes>
    </Router>
  );
}
