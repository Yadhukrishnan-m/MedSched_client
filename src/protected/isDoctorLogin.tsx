import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  children: React.ReactNode;
}
function IsDoctorLogin({ children }: Props) {
  const doctoroken = useSelector(
    (state: RootState) => state.doctorTokenSlice.doctorToken
  );

  if (!doctoroken) {
    return <Navigate to="/doctor" />;
  }

  return <>{children}</>;
}

export default IsDoctorLogin;
