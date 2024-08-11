import styled from "styled-components";
import BookDetails from "../../ui/BookDetails";
import CartButton from "../../ui/CartButton";
import ImgBox from "../../ui/ImgBox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, isPresentInCart } from "../Cart/cartSlice";
import DeleteProduct from "./DeleteProduct";

export default function EbookProduct({
  product,
  isMyshelf = false,
  remainingDays,
  fromLendingLibrary,
  remainingBooks,
  lentBooksNumber,
}) {
  const {
    productImg,
    productName,
    productOfferPrice,
    productAuthor,
    productId,
    productIsbn,
    rentable,
    productType: { typeDesc },
    minRentDays,
    rentPerDay,
  } = product;

  const Navigate = useNavigate();
  const currQuantity = useSelector(isPresentInCart(productId));
  const isInCart = currQuantity > 0;
  const dispatch = useDispatch();
  console.log(rentable);
  const params = new URLSearchParams(`fromShelf=${isMyshelf}`);
  function showProductDetails(productId) {
    Navigate(`/product/${productId}?${params}`);
  }

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

  function handleAddtoCartLent() {
    const newItem = {
      productId,
      productIsbn,
      productName,
      unitPrice: productOfferPrice,
      productType: typeDesc,
      purchaseType: "LENT",
      minRentDays,
      rentPerDay,
    };
    dispatch(addItem(newItem));
  }

  return (
    <>
      <EbookProductBox>
        {remainingBooks > -1 && (
          <div>Remaining number of books you can add: {remainingBooks}</div>
        )}
        <Box>
          <ImgBox
            imageURL={productImg}
            onClick={() => showProductDetails(productId)}
          />
          <ContentBox>
            <BookDetails type="booktitle">{productName}</BookDetails>
            <BookDetails type="author">By {productAuthor}</BookDetails>
            {!isMyshelf && (
              <BookDetails type="price">₹ {productOfferPrice}</BookDetails>
            )}

            {fromLendingLibrary ? (
              <>
                {!isInCart && (
                  <CartButton onClick={handleAddtoCartLent}>
                    {lentBooksNumber < 6 ? "Add To Library" : ""}
                  </CartButton>
                )}
                {isInCart && (
                  <div>
                    <DeleteProduct productId={productId} />
                  </div>
                )}
              </>
            ) : (
              <>
                {remainingDays > 0 && (
                  <BookDetails type="days">
                    Remaining Days:{remainingDays}
                  </BookDetails>
                )}
                {rentable && !isMyshelf && (
                  <div>
                    Rent :{rentPerDay} Min Days:{minRentDays}
                  </div>
                )}
                {!isMyshelf && (
                  <ButtonFlex>
                    {isInCart && (
                      <div>
                        <DeleteProduct productId={productId} />
                      </div>
                    )}
                    {!isInCart && (
                      <CartButton onClick={handleAddtoCart}>
                        Add To Cart
                      </CartButton>
                    )}
                    {!isInCart && rentable && (
                      <>
                        <CartButton onClick={handleAddtoCartRent}>
                          Rent
                        </CartButton>
                      </>
                    )}
                    {/* <CartButton onClick={handleAddtoCart}>Add To Cart</CartButton> */}
                  </ButtonFlex>
                )}
              </>
            )}
          </ContentBox>
        </Box>
      </EbookProductBox>
    </>
  );
}

const EbookProductBox = styled.div`
  opacity: 0px;
  width: 466.45px;
  height: 275.35px;
  gap: 0px;
`;
const Box = styled.div`
  display: flex;
  height: 225.35px;
  gap: 0px;
  opacity: 0px;
`;
// const ImgBox = styled.img`
//   width: auto;
//   height: auto;
//   padding: 20px;
//   object-fit: fit;
//   &:hover {
//     animation: ${scaleUp} 0.3s forwards;
//   }
// `;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 400px;
  gap: 16px;
`;

const ButtonFlex = styled.div`
  display: flex;
  gap: 10px;
`;
