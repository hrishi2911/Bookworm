import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "./BookpageInfo.css";
import { getProduct } from "../../services/apiProduct";
import { useLocation, useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import CartButton from "../../ui/CartButton";
import DeleteProduct from "../ProductLayout/DeleteProduct";
import { useDispatch, useSelector } from "react-redux";
import { addItem, isPresentInCart } from "../Cart/cartSlice";

function BookpageInfo() {
  const [productData, setProductData] = useState(null);
  const { productId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fromShelf = queryParams.get("fromShelf");
  console.log(fromShelf);
  console.log(productId);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProduct(productId);
      setProductData(data);
      console.log(data);
    };
    fetchData();
  }, [productId]);

  const currQuantity = useSelector(isPresentInCart(productId));
  const isInCart = currQuantity > 0;
  const dispatch = useDispatch();
  if (productData == null) return <Spinner />;
  const {
    productImg,
    productName,
    productOfferPrice,
    productAuthor,
    productIsbn,
    rentable,
    productDescriptionLong,
    language: { languageDesc },
    genre: { genreDesc },
    productType: { typeDesc },
    minRentDays,
    rentPerDay,
  } = productData;
  function handleAddtoCart() {
    const newItem = {
      productId,
      productIsbn,
      productName,
      unitPrice: productOfferPrice,
      productType: typeDesc,
      purchaseType: "PURCHASE",
    };
    dispatch(addItem(newItem));
  }

  function handleAddtoCartRent() {
    const newItem = {
      productId,

      productIsbn,
      productName,
      unitPrice: productOfferPrice,
      productType: typeDesc,
      purchaseType: "RENT",
      minRentDays,
      rentPerDay,
    };
    dispatch(addItem(newItem));
  }

  return (
    <>
      <Row className="book-info">
        <Col md={4}>
          <img
            src={"../" + productImg}
            alt="Book Cover"
            className="book-cover"
          />
        </Col>
        <Col md={8}>
          <h1 className="book-title">{productName}</h1>
          <p className="book-author">{productAuthor}</p>
          {fromShelf === "true" ? (
            ""
          ) : (
            <>
              <h3 className="book-price">$ {productOfferPrice}</h3>
              <div className="button-group">
                {/* <CartButton>Buy Now</CartButton> */}
                {isInCart && (
                  <div>
                    <DeleteProduct productId={productId} />
                  </div>
                )}
                {!isInCart && (
                  <CartButton onClick={handleAddtoCart}>Add To Cart</CartButton>
                )}
                {!isInCart && rentable && (
                  <CartButton onClick={handleAddtoCartRent}>Rent</CartButton>
                )}
              </div>
            </>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Summary</h2>
          <p>{productDescriptionLong}</p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-around">
          <Button variant="secondary" size="sm">
            {genreDesc}
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3>Information</h3>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <span>
            <strong>Book Name</strong>
          </span>
          <br />
          <span>{productName}</span>
          <br />
          <br />
          <span>
            <strong>Genre</strong>
          </span>
          <br />
          <span>{genreDesc}</span>
          <br />
          <br />
        </Col>
        <Col>
          <span>
            <strong>{productAuthor}</strong>
            <br />1 July 2016
          </span>
          <br />
          <br />

          <span>
            <strong>Pages</strong>
            <br />
            310 Pages
          </span>
          <br />
          <br />
        </Col>
        <Col>
          <span>
            <strong>Language</strong>
          </span>
          <br />
          <span>{languageDesc}</span>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="outline-primary" size="lg" className="btn1">
            See Comment
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default BookpageInfo;
