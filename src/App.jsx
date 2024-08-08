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
import MyAccount from "./pages/MyAccount";
import Myshelf from "./pages/Myshelf";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
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
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/myshelf" element={<Myshelf />} />
          </Route>
          <Route path="/cart" element={<InvoicePage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route
            path="/login"
            element={<SignInPage setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
