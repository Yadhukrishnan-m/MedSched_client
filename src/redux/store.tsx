import { configureStore } from "@reduxjs/toolkit";
import bystanderTokenSlice from './slice/bystanderTokenSlice'
const store = configureStore({
  reducer: {
    bystanderTokenSlice: bystanderTokenSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
