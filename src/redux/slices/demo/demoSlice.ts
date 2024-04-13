import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};
const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {},
});

export default demoSlice.reducer;
