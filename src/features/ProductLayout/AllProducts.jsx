import BoxTitle from "../../ui/BoxTitle";
import EbookContainer from "./EbookContainer";
import MusicOrVideoContainer from "./MusicOrVideoContainer";

export default function AllProducts() {
  const arr = [
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
      <BoxTitle titleName={"eBook"} />
      <EbookContainer arr={arr} />
      <BoxTitle titleName={"Music"} />
      <MusicOrVideoContainer arr={arr} />
      <BoxTitle titleName={"Video"} />
      <MusicOrVideoContainer arr={arr} />
    </>
  );
}
