import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./utils/routes";
import { GOT } from "./pages/got";
import { Homepage } from "./pages/home";
import { WavyCar } from "./pages/wavy-car";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Homepage />} />
      <Route path={ROUTES.got} element={<GOT />} />
      <Route path={ROUTES.wavyCar} element={<WavyCar />} />
    </Routes>
  );
}

export default App;
