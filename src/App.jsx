import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import LendingLibraryPage from "./pages/LendingLibraryPage";
import AllProducts from "./features/ProductLayout/AllProducts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Homepage />}>
            <Route index element={<AllProducts />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="lendinglib" element={<LendingLibraryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
