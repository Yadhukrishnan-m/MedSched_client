import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bystander_auth from "./pages/Bystander_auth";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bystander" element={<Bystander_auth />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
