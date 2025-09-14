// src/routes/PatientRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Patient_auth from "./pages/patient/Patient_auth";
import IsPatientLogin from "./protected/isPatientLogin";
import IsPatientLogout from "./protected/isPatientLogout";
import PatientPages from "./pages/patient/Patient_pages";

function PatientRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <IsPatientLogout>
            {" "}
            <Patient_auth />
          </IsPatientLogout>
        }
      />
      <Route
        path="/*"
        element={
          <IsPatientLogin>
            <PatientPages />
          </IsPatientLogin>
        }
      />
    </Routes>
  );
}

export default PatientRoutes;
