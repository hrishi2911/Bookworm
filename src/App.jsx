import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import LendingLibraryPage from "./pages/LendingLibraryPage";
import AllProducts from "./features/ProductLayout/AllProducts";
import ViewAllContainer from "./features/ProductLayout/ViewAll";
import SignUpPage from "./pages/Signuppage";
import SignInPage from "./pages/Signinpage";

function App() {
  const ebookarr = [
    {
      imageUrl: "../ebook1.png",
      bookname: "All the light we cannot see",
      price: 199,
      author: "Anthony Doerr",
    },
    {
      imageUrl: "../ebook2.png",
      bookname: "Where the Crawdads sings",
      price: 199,
      author: "Anthony Doerr",
    },
    {
      imageUrl: "../ebook3.png",
      bookname: "Rich People Problems",
      price: 199,
      author: "Anthony Doerr",
    },
    {
      imageUrl: "../ebook4.png",
      bookname: "Crazy Rich Asians",
      price: 459,
      author: "Kevin Kwan",
    },
    {
      imageUrl: "../ebook1.png",
      bookname: "All the light we cannot see",
      price: 199,
      author: "Anthony Doerr",
    },
    {
      imageUrl: "../ebook2.png",
      bookname: "Where the Crawdads sings",
      price: 199,
      author: "Anthony Doerr",
    },
    {
      imageUrl: "../ebook3.png",
      bookname: "Rich People Problems",
      price: 199,
      author: "Anthony Doerr",
    },
    {
      imageUrl: "../ebook4.png",
      bookname: "Crazy Rich Asians",
      price: 459,
      author: "Kevin Kwan",
    },
  ];
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}>
            <Route index element={<AllProducts />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/lendinglib" element={<LendingLibraryPage />} />
            <Route
              path="/EBookViewAll"
              element={<ViewAllContainer ebookarr={ebookarr} />}
            />
          </Route>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<SignInPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
