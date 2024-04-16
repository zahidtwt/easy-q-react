import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {},
  isLoading: false,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk("userSlice/createUser", async (payload) => {
  return {
    data: payload,
    name: "done",
  };
});

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // EXAMPLE ONE
    // builder.addCase().addCase().addCase();
    // EXAMPLE TWO
    // builder.addCase()
    // builder.addCase()

    builder
      .addCase(createUser.pending, (state) => {
        state.details = {};
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.details = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.details = {};
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message as string;
      });
  },
});

export default userSlice.reducer;
