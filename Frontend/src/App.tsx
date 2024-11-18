// Styling
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

// Components
import EmployeeView from "./components/EmployeeView/EmployeeView";
import Navbar from "./components/Navbar/Navbar";
import Error from "./pages/Error";
import EmployeeDetails from "./pages/EmployeeDetails";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <div className="grid grid-cols-1 gap-1 p-2">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/" element={<AppLayout />}>
            <Route path="home" element={<EmployeeView />} />
            <Route path="details" element={<EmployeeDetails />} />
          </Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
