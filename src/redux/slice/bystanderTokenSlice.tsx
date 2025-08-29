import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface BystanderTokenState {
  bystanderToken: string | null;
}

const initialState: BystanderTokenState = {
  bystanderToken: JSON.parse(localStorage.getItem("bystanderAccessToken") || "null"),
};

const bystanderTokenSlice = createSlice({
  name: "bystandertokenSlice", // Updated to match the store
  initialState,
  reducers: {
    addBystanderToken: (state, action: PayloadAction<string>) => {
      state.bystanderToken = action.payload;
      
      localStorage.setItem(
        "bystanderAccessToken",
        JSON.stringify(action.payload)
      );
    },
    removeBystanderToken: (state) => {
      state.bystanderToken = null;
      localStorage.removeItem("bystanderAccessToken");
    },
  },
});

export const { addBystanderToken, removeBystanderToken } = bystanderTokenSlice.actions;
export default bystanderTokenSlice.reducer;
