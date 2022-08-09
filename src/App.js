import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//Context
import { HomepageProvider, DetailProvider, GlobalProvider } from "./context"

//Components
import {
  Bag,
  Homepage,
  Details
} from "./pages";
import {
  Navbar
} from "./components";

const App = () => {
  return (
    <div id="app">
      <BrowserRouter>
        <GlobalProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomepageProvider><Homepage /></HomepageProvider>} />
            <Route path="/pokebag" element={<Bag />} />
            <Route path="/:name" element={<DetailProvider><Details /></DetailProvider>} />
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
