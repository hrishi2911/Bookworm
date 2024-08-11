import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, Suspense, lazy } from "react";
import Spinner from "./ui/Spinner";

// Lazy load the components
const Homepage = lazy(() => import("./pages/Homepage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const LendingLibraryPage = lazy(() => import("./pages/LendingLibraryPage"));
const AllProducts = lazy(() => import("./features/ProductLayout/AllProducts"));
const ViewAllContainer = lazy(() => import("./features/ProductLayout/ViewAll"));
const SignUpPage = lazy(() => import("./pages/Signuppage"));
const SignInPage = lazy(() => import("./pages/Signinpage"));
const InvoicePage = lazy(() => import("./features/Invoice/InvoicePage"));
const BookpageInfo = lazy(() =>
  import("./features/ProductDetails/BookpageInfo")
);
const MyAccount = lazy(() => import("./pages/MyAccount"));
const Myshelf = lazy(() => import("./pages/Myshelf"));
const MyLibrary = lazy(() => import("./pages/MyLibrary"));
const CategoryProducts = lazy(() =>
  import("./features/ProductLayout/CategoryProducts")
);

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
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
              <Route
                path="/lendinglib"
                element={<LendingLibraryPage searchTerm={searchTerm} />}
              />
              <Route
                path="/EBookViewAll"
                element={<ViewAllContainer searchTerm={searchTerm} />}
              />
              <Route
                path="/category/:category"
                element={<CategoryProducts searchTerm={searchTerm} />}
              />

              <Route path="/myaccount" element={<MyAccount />} />
              <Route path="/mylibrary" element={<MyLibrary />} />
              <Route path="/myshelf" element={<Myshelf />} />
            </Route>
            <Route path="/cart" element={<InvoicePage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route
              path="/login"
              element={<SignInPage setIsLoggedIn={setIsLoggedIn} />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
