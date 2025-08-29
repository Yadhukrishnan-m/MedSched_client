import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  children: React.ReactNode;
}
function IsBystanderLogin({ children }: Props) {
  const bystanderoken = useSelector(
    (state: RootState) => state.bystanderTokenSlice.bystanderToken
  );

  if (!bystanderoken) {
    return <Navigate to="/bystander" />;
  }

  return <>{children}</>;
}

export default IsBystanderLogin;
