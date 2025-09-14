import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface DoctorTokenState {
  doctorToken: string | null;
}

const initialState: DoctorTokenState = {
  doctorToken: JSON.parse(
    localStorage.getItem("doctorAccessToken") || "null"
  ),
};

const doctorTokenSlice = createSlice({
  name: "doctortokenSlice", // Updated to match the store
  initialState,
  reducers: {
    addDoctorToken: (state, action: PayloadAction<string>) => {
      state.doctorToken = action.payload;

      localStorage.setItem(
        "doctorAccessToken",
        JSON.stringify(action.payload)
      );
    },
    removeDoctorToken: (state) => {
      state.doctorToken = null;
      localStorage.removeItem("doctorAccessToken");
    },
  },
});

export const { addDoctorToken, removeDoctorToken } =
  doctorTokenSlice.actions;
export default doctorTokenSlice.reducer;
