import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./utils/routes";
import { GOT } from "./pages/got";
import { Homepage } from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Homepage />} />
      <Route path={ROUTES.got} element={<GOT />} />
    </Routes>
  );
}

export default App;
