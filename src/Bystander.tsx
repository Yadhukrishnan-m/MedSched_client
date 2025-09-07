// src/routes/BystanderRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Bystander_auth from "./pages/bystander/Bystander_auth";
import Bystander_home from "./pages/bystander/Bystander_home";
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
        path="/home"
        element={
          <IsBystanderLogin>
            <Bystander_home />
          </IsBystanderLogin>
        }
      />
    </Routes>
  );
}

export default BystanderRoutes;
