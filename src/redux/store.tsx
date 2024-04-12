import { configureStore } from "@reduxjs/toolkit";
// import logger from "./middlewares/logger";
import demoReducer from "./slices/demo/demoSlice";
import userReducer from "./slices/user/userSlice";
import baseApi from "./api/baseApi";

const store = configureStore({
  reducer: {
    demoReducer: demoReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    userReducer: userReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
