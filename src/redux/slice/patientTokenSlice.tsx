import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface PatientTokenState {
  patientToken: string | null;
}

const initialState: PatientTokenState = {
  patientToken: JSON.parse(
    localStorage.getItem("patientAccessToken") || "null"
  ),
};

const patientTokenSlice = createSlice({
  name: "patienttokenSlice", // Updated to match the store
  initialState,
  reducers: {
    addPatientToken: (state, action: PayloadAction<string>) => {
      state.patientToken = action.payload;

      localStorage.setItem(
        "patientAccessToken",
        JSON.stringify(action.payload)
      );
    },
    removePatientToken: (state) => {
      state.patientToken = null;
      localStorage.removeItem("patientAccessToken");
    },
  },
});

export const { addPatientToken, removePatientToken } =
  patientTokenSlice.actions;
export default patientTokenSlice.reducer;
