// import { useAppSelector } from "@/redux/hooks";
import { unMarkAllCartItems } from "@/redux/features/cart/cartSlice";
import { useGetAuthorQuery } from "@/redux/features/user/user.api";
import { logout, setLoading, setUser } from "@/redux/features/user/user.slice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  // const { token } = useAppSelector((state) => state.auth);

  const { data, isSuccess, isError, isFetching } = useGetAuthorQuery(undefined);

  useEffect(() => {
    dispatch(unMarkAllCartItems());
  }, []);

  useEffect(() => {
    dispatch(setLoading(isFetching));

    if (isSuccess) {
      dispatch(setUser(data?.data));
      dispatch(setLoading(false));
    }

    if (isError) {
      dispatch(setLoading(false));
      dispatch(logout(undefined));
      dispatch(setUser(null));
    }
  }, [isFetching, isSuccess, dispatch, data?.data, isError]);

  return <>{children}</>;
};

export default AuthProvider;
