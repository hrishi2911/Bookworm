import { useEffect, useState } from "react";
import BoxTitle from "../../ui/BoxTitle";
import EbookContainer from "./EbookContainer";
import MusicOrVideoContainer from "./MusicOrVideoContainer";
import { getAllProducts } from "../../services/apiProduct";
import Spinner from "../../ui/Spinner";

export default function AllProducts() {
  //   const arr = [
  //     {
  //       productImg: "../ebook1.png",
  //       productName: "All the light we cannot see",
  //       productOfferPrice: 199,
  //       productAuthor: "Anthony Doerr",
  //     },
  //     {
  //       productImg: "../ebook2.png",
  //       productName: "Where the Crawdads sings",
  //       productOfferPrice: 199,
  //       productAuthor: "Anthony Doerr",
  //     },
  //     {
  //       productImg: "../ebook3.png",
  //       productName: "Rich People Problems",
  //       productOfferPrice: 199,
  //       productAuthor: "Anthony Doerr",
  //     },
  //     {
  //       productImg: "../ebook4.png",
  //       productName: "Crazy Rich Asians",
  //       productOfferPrice: 459,
  //       productAuthor: "Kevin Kwan",
  //     },
  //   ];

  const [arr, setArr] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      setArr(data);
      console.log(data);
    };

    fetchData();
  }, []);

  if (arr === null) return <Spinner />;
  return (
    <>
      <BoxTitle titleName={"eBook"} viewAll={"ebook"} />
      <EbookContainer arr={arr} />
      <BoxTitle titleName={"Music"} viewAll={"audiobook"} />
      <MusicOrVideoContainer arr={arr} />
      <BoxTitle titleName={"Video"} viewAll={"video"} />
      <MusicOrVideoContainer arr={arr} />
    </>
  );
}
