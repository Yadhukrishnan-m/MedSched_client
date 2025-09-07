import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  children: React.ReactNode;
}

function IsPatientLogout({ children }: Props) {
  const patientTocken = useSelector(
    (state: RootState) => state.patientTokenSlice.patientToken
  );

  if (patientTocken) {
    return <Navigate to="/patient/home" />;
  }

  return <>{children}</>;
}

export default IsPatientLogout;
