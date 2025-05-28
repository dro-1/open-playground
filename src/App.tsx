import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./utils/routes";
import { Blandine } from "./pages/blandine";
import { Homepage } from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Homepage />} />
      <Route path={ROUTES.blandine} element={<Blandine />} />
    </Routes>
  );
}

export default App;
