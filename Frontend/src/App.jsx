import { Login } from "./Pages/Login";
import{Signup} from "./Pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login formname="Login" />} />
          <Route path="/signup" element={<Signup formname="Signup"/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
