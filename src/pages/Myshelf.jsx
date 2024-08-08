import { useEffect, useState } from "react";
import { getMyShelfDetails } from "../services/apiMyShelf";
import Spinner from "../ui/Spinner";

export default function Myshelf() {
  const [myshelf, setMyshelf] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyShelfDetails(localStorage.getItem("custId"));
      setMyshelf(data);
      console.log(data);
    };
    fetchData();
  }, []);

  if (myshelf === null || myshelf.length === 0) return <Spinner />;
  return <></>;
}
