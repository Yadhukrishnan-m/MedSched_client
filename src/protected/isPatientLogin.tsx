import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  children: React.ReactNode;
}
function IsPatientLogin({ children }: Props) {
  const patientoken = useSelector(
    (state: RootState) => state.patientTokenSlice.patientToken
  );

  if (!patientoken) {
    return <Navigate to="/patient" />;
  }

  return <>{children}</>;
}

export default IsPatientLogin;
