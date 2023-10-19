import { Routes, Route } from "react-router-dom";
import { ChatPage, LoginPage, RegisterPage, ErrorPage, SetAvatarPage } from "../pages";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/set-avatar" element={<SetAvatarPage />} />
      <Route path="/" element={<ChatPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRoutes;
