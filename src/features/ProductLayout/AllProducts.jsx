import { useEffect, useState } from "react";
import BoxTitle from "../../ui/BoxTitle";
import EbookContainer from "./EbookContainer";
import MusicOrVideoContainer from "./MusicOrVideoContainer";
import { getAllProducts } from "../../services/apiProduct";
import Spinner from "../../ui/Spinner";

export default function AllProducts({ searchTerm }) {
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

  const [ebookList, setEbookList] = useState(null);
  const [audioList, setAudioList] = useState(null);
  const [videoList, setVideoList] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      setEbookList(
        data.filter((product) => product.productType.typeDesc === "EBOOK")
      );
      setAudioList(
        data.filter((product) => product.productType.typeDesc === "AUDIOBOOK")
      );
      setVideoList(
        data.filter((product) => product.productType.typeDesc === "VIDEO")
      );
      console.log(data);
    };

    fetchData();
  }, []);

  const filterProducts = (products) => {
    if (!searchTerm) return products;
    return products.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productAuthor
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        product.productIsbn.includes(searchTerm)
    );
  };

  if (ebookList === null) return <Spinner />;

  const filteredEbooks = filterProducts(ebookList);
  const filteredAudiobooks = filterProducts(audioList);
  const filteredVideos = filterProducts(videoList);
  return (
    <>
      <BoxTitle titleName={"eBook"} viewAll={"ebook"} />
      <EbookContainer arr={filteredEbooks} />
      <BoxTitle titleName={"Music"} viewAll={"audiobook"} />
      <MusicOrVideoContainer arr={filteredAudiobooks} />
      <BoxTitle titleName={"Video"} viewAll={"video"} />
      <MusicOrVideoContainer arr={filteredVideos} />
    </>
  );
}
