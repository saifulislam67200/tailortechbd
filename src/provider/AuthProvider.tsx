// import { useAppSelector } from "@/redux/hooks";
import { useGetAuthorQuery } from "@/redux/features/user/user.api";
import { setLoading, setUser } from "@/redux/features/user/user.slice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  // const { token } = useAppSelector((state) => state.auth);

  const { data, isSuccess, isError, isFetching } = useGetAuthorQuery(undefined);

  console.log("AuthProvider", data, isSuccess, isError, isFetching);

  useEffect(() => {
    dispatch(setLoading(isFetching));

    if (isSuccess) {
      dispatch(setUser(data?.data));
      dispatch(setLoading(false));
    }

    if (isError) {
      dispatch(setLoading(false));
      dispatch(setUser(null));
    }
  }, [isFetching, isSuccess, dispatch, data?.data, isError]);

  return <>{children}</>;
};

export default AuthProvider;
