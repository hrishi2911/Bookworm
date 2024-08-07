import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import LendingLibraryPage from "./pages/LendingLibraryPage";
import AllProducts from "./features/ProductLayout/AllProducts";
import ViewAllContainer from "./features/ProductLayout/ViewAll";
import SignUpPage from "./pages/Signuppage";
import SignInPage from "./pages/Signinpage";
import InvoicePage from "./features/Invoice/InvoicePage";
import BookpageInfo from "./features/ProductDetails/BookpageInfo";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Homepage setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            }
          >
            <Route index element={<AllProducts searchTerm={searchTerm} />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:productId" element={<BookpageInfo />} />
            <Route path="/lendinglib" element={<LendingLibraryPage />} />
            <Route
              path="/EBookViewAll"
              element={<ViewAllContainer searchTerm={searchTerm} />}
            />
          </Route>
          <Route path="/cart" element={<InvoicePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
