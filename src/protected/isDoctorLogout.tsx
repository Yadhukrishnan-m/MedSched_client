import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  children: React.ReactNode;
}

function IsDoctorLogout({ children }: Props) {
  const doctorTocken = useSelector(
    (state: RootState) => state.doctorTokenSlice.doctorToken
  );

  if (doctorTocken) {
    return <Navigate to="/doctor/home" />;
  }

  return <>{children}</>;
}

export default IsDoctorLogout;
