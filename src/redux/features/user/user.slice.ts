import { IUser } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  user: IUser | null;
  isLoading: boolean;
  token: string | null;
  role: {
    _id: string;
    name: string;
  } | null;
};
const initialState: TAuthState = {
  user: null,
  isLoading: true,
  token: null,
  role: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    logout(state) {
      state.user = null;
      state.isLoading = false;
      state.token = null;
      state.role = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action?.payload || false;
    },

    updateUser(state, action: PayloadAction<Partial<IUser>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },

    setState(_state, action: PayloadAction<TAuthState>) {
      return action.payload;
    },
  },
});

export const { setUser, logout, setLoading, setState, updateUser, setToken } = userSlice.actions;
export default userSlice.reducer;
