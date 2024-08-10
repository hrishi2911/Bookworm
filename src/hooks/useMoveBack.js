import { useNavigate } from "react-router-dom";

export function useHomeBack() {
  const navigate = useNavigate();
  return () => navigate("/");
}
