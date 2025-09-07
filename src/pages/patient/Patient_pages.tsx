import  CollapsibleSidebar  from "./Patient_sidepannel";
import  PatientHome  from "./Patient_home";
import { Route, Routes } from "react-router-dom";

export default function PatientPages() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Routes>
        <Route
          path="/home"
          element={
            <>
              {" "}
              <CollapsibleSidebar />
              <PatientHome />
            </>
          }
        />
      </Routes>
    </div>
  );
}
