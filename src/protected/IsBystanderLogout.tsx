import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  children: React.ReactNode;
}

function IsBystanderLogout({ children }: Props) {
  const bystanderTocken = useSelector(
    (state: RootState) => state.bystanderTokenSlice.bystanderToken
  );

  if (bystanderTocken) {
    return <Navigate to="/bystander-home" />;
  }

  return <>{children}</>;
}

export default IsBystanderLogout;
