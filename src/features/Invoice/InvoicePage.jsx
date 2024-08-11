/* eslint-disable react/no-unknown-property */
import "./InvoicePage.css"; // Custom CSS for specific styles
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../Cart/cartSlice";
import DeleteProduct from "../ProductLayout/DeleteProduct";
import PayButton from "./PayButton";
import { useNavigate } from "react-router-dom";

const InvoicePage = () => {
  return (
    <div className="invoice-page">
      <Header />
      <Invoice />
    </div>
  );
};

const Header = () => {
  return (
    <header className="header bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="container">
        <img src={"./Logo.png"} alt="Main Logo" id="CartLogocss" />
        <h2 id="ca">Cart</h2>
        {/* <FontAwesomeIcon id='fa' icon={faArrowLeft} />
         */}
      </div>
    </header>
  );
};
const Invoice = () => {
  const allProducts = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  return (
    <>
      <section className="invoice bg-white p-5 shadow-lg border rounded-md mx-auto my-8 w-11/12 md:w-2/3 lg:w-1/2">
        <h3 id="inv">INVOICE</h3>
        <table className="min-w-full bg-white border-collapse mb-6">
          <thead id="he" className="bg-gray-200">
            <tr>
              {/* <th className="w-1/12 border px-4 py-2">S.No.</th> */}
              <th className="w-2/12 border px-4 py-2">ISBN</th>
              <th className="w-2/12 border px-4 py-2">Product Type</th>
              <th className="w-3/12 border px-4 py-2">Title</th>
              <th className="w-2/12 border px-4 py-2">Purchase Type</th>
              <th className="w-2/12 border px-4 py-2">Price</th>

              <th className="w-1/12 border px-4 py-2">Remove?</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product, index) => (
              <TableRow product={product} key={index} />
            ))}
          </tbody>
        </table>
        <div class="vspace1em"></div>
        <hr />
        <div class="vspace1em"></div>
        <div id="dv1" class="detailrow">
          <div class="detail-row">
            <span class="label">TOTAL</span>
            <span class="value">${totalPrice}</span>
          </div>

          {/* <div class="vspace1em"></div>

          <div class="detail-row">
            <span id="c1" class="label">
              LESS : DISCOUNT 5 %
            </span>
            <span class="value">$ 56.85</span>
          </div>

          <div class="vspace1em"></div>
          <hr />
          <div class="vspace1em"></div>

          <div class="detail-row">
            <span class="label">SUB TOTAL</span>
            <span class="value">$ 322.15</span>
          </div>

          <div class="vspace1em"></div>

          <div class="detail-row">
            <span id="c1">ADD : VAT 10 %</span>
            <span class="value">$ 32.212</span>
          </div>

          <div class="vspace1em"></div>

          <div class="detail-row">
            <span id="c1">S.C. : 2.5 %</span>
            <span class="value">$ 8.05</span>
          </div>

          <div class="vspace1em"></div>
          <hr />
          <div class="vspace1em"></div>

          <div class="detail-row">
            <span class="label">TOTAL PAYABLE</span>
            <span class="value"> $362.41</span>
          </div>

          <div class="vspace1em"></div> */}
        </div>
        {/* <GiftSection /> */}
        <PaymentSection />
      </section>
    </>
  );
};

function TableRow({ product }) {
  const {
    productId,
    productIsbn,
    productName,
    unitPrice,
    productType,
    purchaseType,
    rentPerDay,
    minRentDays,
  } = product;
  return (
    <tr>
      {/* <td className="border px-4 py-2">{productId}</td> */}
      <td className="border px-4 py-2">{productIsbn}</td>
      <td className="border px-4 py-2">{productType}</td>
      <td className="border px-4 py-2">{productName}</td>
      <td className="border px-4 py-2">{purchaseType}</td>
      <td className="border px-4 py-2">
        {purchaseType === "RENT"
          ? rentPerDay * minRentDays
          : purchaseType === "LENT"
          ? 0
          : unitPrice}
      </td>
      <td className="border px-4 py-2 text-center">
        <DeleteProduct productId={productId} />
      </td>
    </tr>
  );
}

// const GiftSection = () => {
//   return (
//     <div className="gift-section my-6">
//       <div className="flex items-center mb-2">
//         <label htmlFor="gift" className="ml-2">
//           Want To Gift?
//         </label>
//         <input type="checkbox" id="gift" />
//       </div>
//       <div class="vspace1em"></div>
//       <div className="flex flex-col space-y-2">
//         <input
//           type="text"
//           id="rn"
//           placeholder="Receiver's Name"
//           className="border p-100 rounded"
//         />
//         <div class="vspace1em"></div>
//         <input
//           type="email"
//           id="rn"
//           placeholder="Receiver's EMail ID"
//           className="border p-100 rounded"
//         />
//         <div class="vspace1em"></div>
//         <div class="vspace1em"></div>
//         <div class="vspace1em"></div>
//       </div>
//       <button id="rbt" className="mt-2 bg-blue-500 text-white p-2 rounded">
//         ADD RECEIPT
//       </button>
//       <div class="vspace1em"></div>
//       <div class="vspace1em"></div>
//     </div>
//   );
// };

const PaymentSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleCancel() {
    dispatch(clearCart());
    navigate("/");
  }
  return (
    <>
      {/* <div id="ps1">
        <label>
          <span>
            Select Payment Mode:
            <input type="radio" id="p1" name="paymentMode" value="debit" />
            Debit Card
            <input type="radio" id="p1" name="paymentMode" value="credit" />
            Credit Card
            <input type="radio" id="p1" name="paymentMode" value="upi" />
            UPI
          </span>
        </label>
      </div> */}

      <div class="vspace1em"></div>
      <div class="vspace1em"></div>
      <div class="vspace1em"></div>

      <div id="ps2">
        <PayButton id="bt1" value={"Pay"} />
        {/* <button id="bt1">PAY</button> */}
        <button id="bt2" onClick={handleCancel}>
          CANCEL
        </button>
        <button id="bt3">PRINT INVOICE</button>
        <button id="bt4">EMAIL INVOICE</button>
      </div>

      <div class="vspace1em"></div>
      <div class="vspace1em"></div>
      <div class="vspace1em"></div>
    </>
  );
};

export default InvoicePage;
