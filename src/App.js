import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import MainLayout from "./pages/MainLayout";

function App() {

  return (
    <>
      <HashRouter>
              <Routes>
                <Route  path="/" element={<MainLayout/>}>
                  <Route index  element={<Home />}></Route>
                  <Route path="/cart" element={<Cart />}></Route>
                  <Route path="*" element={<NotFound />}></Route>
                </Route>
              </Routes>


      </HashRouter>
    </>
  );
}

export default App;
