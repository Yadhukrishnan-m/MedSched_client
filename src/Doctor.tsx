// src/routes/DoctorRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Doctor_auth from "./pages/doctor/Doctor_auth";
// import IsDoctorLogin from "./protected/isDoctorLogin";
// import IsDoctorLogout from "./protected/isDoctorLogout";
import DoctorPges from "./pages/doctor/Doctor_pages";
import IsDoctorLogout from "./protected/isDoctorLogout";
import IsDoctorLogin from "./protected/isDoctorLogin";

function DoctorRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <IsDoctorLogout>
              <Doctor_auth />
            </IsDoctorLogout>
          </>
        }
      />
      <Route
        path="/*"
        element={
          <>
            <IsDoctorLogin>
              <DoctorPges />
            </IsDoctorLogin>
          </>
        }
      />
    </Routes>
  );
}

export default DoctorRoutes;
