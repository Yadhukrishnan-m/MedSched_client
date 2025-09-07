import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BystanderRoutes from "./Bystander";
import PatientRoutes from "./Patient";
// import DoctorRoutes from "./routes/DoctorRoutes";

function App() {
  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route path="/bystander/*" element={<BystanderRoutes />} />
          <Route path="/patient/*" element={<PatientRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
