import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./utils/routes";
import { GOT } from "./pages/got";
import { Homepage } from "./pages/home";
import { WavyCar } from "./pages/wavy-car";
import { NowPlaying } from "./pages/now-playing";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Homepage />} />
      <Route path={ROUTES.got} element={<GOT />} />
      <Route path={ROUTES.wavyCar} element={<WavyCar />} />
      <Route path={ROUTES.nowPlaying} element={<NowPlaying />} />
    </Routes>
  );
}

export default App;
