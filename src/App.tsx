import "./scss/app.scss";
import  Home  from "./pages/Home.tsx";
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart.tsx";
import NotFound from "./pages/NotFound.tsx";
import MainLayout from "./pages/MainLayout.tsx";
import FullPizza from "./pages/FullPizza.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home />}></Route>
            <Route path="pizza/:id" element={<FullPizza />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
