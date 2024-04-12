import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";

const logger: Middleware<object, RootState> = (state) => (next) => (action) => {
  const currentState = state.getState();
  //   console.log(currentState);
  if (currentState) next(action);
};

export default logger;
