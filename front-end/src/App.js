import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Layout from "./components/Layout";
import Authenticate from "./components/Authenticate";
import Teams from "./components/clientandbankcrud/Teams";
import TeamPlayers from "./components/clientandbankcrud/TeamPlayers";
import AllPlayers from "./components/clientandbankcrud/AllPlayers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Authenticate />}>
          <Route path="/" element={<Layout />}>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/banks" element={<Teams />} />
            <Route path="/bank/:id/clients" element={<TeamPlayers />} />
            <Route path="/clients" element={<AllPlayers />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
