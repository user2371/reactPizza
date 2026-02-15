import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import MainLayout from "./pages/MainLayout";
import { useState } from "react";

function App() {
  const [searchStr, setSearchStr] = useState("");
  
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout searchStr={searchStr} setSearchStr={setSearchStr} />}>
            <Route index element={<Home searchStr={searchStr} />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>


      </HashRouter>
    </>
  );
}

export default App;
