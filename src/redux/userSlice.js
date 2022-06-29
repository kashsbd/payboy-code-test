import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  age: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    submitNameAndAge: (state, payload) => {
      state.name = payload.name;
      state.age = payload.age;
    },
  },
});

export const { submitNameAndAge } = userSlice.actions;

export default userSlice.reducer;