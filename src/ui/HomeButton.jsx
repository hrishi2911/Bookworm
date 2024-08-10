import { IoHome } from "react-icons/io5";

export default function HomeButton({ onClick }) {
  return (
    <>
      <IoHome
        onClick={onClick}
        style={{ height: "20px", width: "20px", cursor: "pointer" }}
      />
    </>
  );
}
