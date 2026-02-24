import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import MainLayout from "./pages/MainLayout";
import { createContext, useState } from "react";

export const AppContext = createContext(null);

function App() {
  const [searchStr, setSearchStr] = useState("");

  return (
    <>
    <AppContext.Provider value = {{searchStr, setSearchStr}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
