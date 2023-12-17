import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Layout from "./components/Layout";
import Authenticate from "./components/Authenticate";
import Sculptures from "./components/sculptureandsculptor/Sculptures";
import SculptureDetail from "./components/sculptureandsculptor/SculptureDetail";
import Sculptors from "./components/sculptureandsculptor/Sculptors";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Authenticate />}>
          <Route path="/" element={<Layout />}>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/sculptures" element={<Sculptures />} />
            <Route path="/sculpture/:id" element={<SculptureDetail />} />
            <Route path="/sculptors" element={<Sculptors />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
