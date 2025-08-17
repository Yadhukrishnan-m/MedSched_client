import { Suspense,  } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/shared/loader";
import Bystander_auth from "./pages/Bystander_auth";

// Lazy load components


function Admin() {
  return (
    <>
      <Suspense fallback={<Loader message={"loading..."} />}>
        <Routes>
          <Route path="/login" element={<Bystander_auth/>}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default Admin;
