import { configureStore } from "@reduxjs/toolkit";
import demoReducer from "./slices/demo/demoSlice";
import userReducer from "./slices/user/userSlice";
// import baseApi from "./api/baseApi";
// import logger from "./middlewares/logger";

const store = configureStore({
  reducer: {
    demoReducer: demoReducer,
    userReducer: userReducer,
    // [baseApi.reducerPath]: baseApi.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
