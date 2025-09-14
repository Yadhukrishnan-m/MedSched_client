import CollapsibleSidebar from "./Bystander_sidepannel";
import BystanderHome from "./Bystander_home";
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
              <BystanderHome />
            </>
          }
        />
      </Routes>
    </div>
  );
}
