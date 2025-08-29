import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bystander_auth from "./pages/Bystander_auth";
import Bystander_home from './pages/Bystander_home'
import { ToastContainer } from "react-toastify";
import IsBystanderLogin from "./protected/IsBystanderLogin";
import IsBystanderLogout from "./protected/IsBystanderLogout";
function App() {
  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route
            path="/bystander"
            element={
              <IsBystanderLogout>
                <Bystander_auth />
              </IsBystanderLogout>
            }
          />

          <Route
            path="/bystander-home"
            element={
              <IsBystanderLogin>
                <Bystander_home />
              </IsBystanderLogin>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
