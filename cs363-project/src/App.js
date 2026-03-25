import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import AdminMenuPage from "./pages/AdminMenuPage";

// ── Route definitions ────────────────────────────────────────────────────────
// เพิ่ม Route ใหม่ได้โดย import Page แล้วเพิ่ม <Route> ด้านล่าง
// ตัวอย่าง: <Route path="/order-history" element={<OrderHistoryPage />} />

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/admin" element={<AdminMenuPage />} />
      </Routes>
    </Router>
  );
}
