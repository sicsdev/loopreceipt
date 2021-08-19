import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useAppDispatch } from "@store/hooks";

import { useFetch } from "@hooks/useFetch";
import usersApi from "@apiClient/usersApi";
import { EntityUser } from "@apiHelpers/types";

import { setUser } from "@store/slices/userSlice";
import MyLoader from "@components/Shared/MyLoader";
// if you want to show navbar then wrap content inside layout in auth guard
// if don't want to show navbar then wrap layout in authguard
interface AuthGuardProps {
  children: any;
}
const AuthGuard = ({ children }: AuthGuardProps) => {
  const styles = useStyles();
  const { data: userData } = useFetch<{ user: EntityUser }>(usersApi.getMe);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userData?.user) {
      dispatch(setUser(userData.user));
    }
  }, [userData]);
  return userData?.user ? children : <MyLoader windowCentered />;
};
export default AuthGuard;
const useStyles = makeStyles((theme) => ({}));
