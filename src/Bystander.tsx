// src/routes/BystanderRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Bystander_auth from "./pages/bystander/Bystander_auth";
import Bystander_pages from "./pages/bystander/Bystander_pages";
import IsBystanderLogin from "./protected/IsBystanderLogin";
import IsBystanderLogout from "./protected/IsBystanderLogout";

function BystanderRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <IsBystanderLogout>
            <Bystander_auth />
          </IsBystanderLogout>
        }
      />
      <Route
        path="/*"
        element={
          <>
            <IsBystanderLogin>
              <Bystander_pages />
            </IsBystanderLogin>
          </>
        }
      />
    </Routes>
  );
}

export default BystanderRoutes;
