import { configureStore } from "@reduxjs/toolkit";
import bystanderTokenSlice from './slice/bystanderTokenSlice'
import patientTokenSlice from './slice/patientTokenSlice'
const store = configureStore({
  reducer: {
    bystanderTokenSlice: bystanderTokenSlice,
    patientTokenSlice: patientTokenSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
