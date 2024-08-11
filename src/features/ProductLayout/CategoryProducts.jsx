import { useEffect, useState } from "react";
import BoxTitle from "../../ui/BoxTitle";
import EbookContainer from "./EbookContainer";
import MusicOrVideoContainer from "./MusicOrVideoContainer";
import { getAllProducts } from "../../services/apiProduct";
import Spinner from "../../ui/Spinner";
import { useParams } from "react-router-dom";

export default function CategoryProducts({ searchTerm }) {
  const { category } = useParams();
  console.log(category);
  const [ebookList, setEbookList] = useState(null);
  const [audioList, setAudioList] = useState(null);
  const [videoList, setVideoList] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      setEbookList(
        data.filter(
          (product) => product.genre.genreDesc.toLowerCase() === category
        )
      );
      setAudioList(
        data.filter(
          (product) =>
            product.genre.genreDesc.toLowerCase() === category.toLowerCase()
        )
      );
      setVideoList(
        data.filter(
          (product) =>
            product.genre.genreDesc.toLowerCase() === category.toLowerCase()
        )
      );
      console.log(data);
    };

    fetchData();
  }, [category]);

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
