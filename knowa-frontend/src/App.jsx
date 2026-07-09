import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import OathPage from "./pages/OathPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import "./App.css";
import AdminDashboard from "./pages/AdminDashboard";
import CreateQuiz from "./pages/CreateQuiz";
import ManageQuizzes from "./pages/ManageQuizzes";
import RoleSelection from "./pages/RoleSelection";
import AdminLogin from "./pages/AdminLogin";
import AdminResults from "./pages/AdminResults";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<RoleSelection />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/student-login" element={<Login />} />
        <Route path="/admin-bettermind-2025" element={<AdminLogin />} />
        {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/oath" element={<OathPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreateQuiz />} />
        <Route path="/admin/manage" element={<ManageQuizzes />} />
        <Route path="/admin/results" element={<AdminResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
