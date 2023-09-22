import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Layout from "./components/Layout";
import { Container } from "@mui/material";
import Authenticate from "./components/Authenticate";
import Teams from "./components/Teams";
import TeamPlayers from "./components/TeamPlayers";
import AllPlayers from "./components/AllPlayers";

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
