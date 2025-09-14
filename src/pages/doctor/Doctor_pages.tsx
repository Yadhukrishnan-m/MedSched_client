import CollapsibleSidebar from "./Doctor_sidepannel";
import DoctorHome from "./Doctor_home";
import { Route, Routes } from "react-router-dom";

export default function PatientPages() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Routes>
        <Route
          path="/home"
          element={
            <>
              
              <CollapsibleSidebar />
              <DoctorHome />
            </>
          }
        />
      </Routes>
    </div>
  );
}
