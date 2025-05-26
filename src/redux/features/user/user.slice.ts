import { IUser } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  user: IUser | null;
  isLoading: boolean;
};
const initialState: TAuthState = {
  user: null,
  isLoading: true,
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
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action?.payload || false;
    },

    updateUser(state, action: PayloadAction<Partial<IUser>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    setState(_state, action: PayloadAction<TAuthState>) {
      return action.payload;
    },
  },
});

export const { setUser, logout, setLoading, setState, updateUser } = userSlice.actions;
export default userSlice.reducer;
