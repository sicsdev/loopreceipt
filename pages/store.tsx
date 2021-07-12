import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "@store/slices/userSlice";
import React from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";

export default function Landing() {
  //   const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  //   const user = useSelector(getUser);
  const user = useAppSelector((state) => state.user);

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(
        setUser({
          id: 2,
          username: "Kevin",
        })
      );
    }, 2000);
  });

  return (
    <div>
      <p>
        Logged in as <span>{`${user.username} (id: ${user.id})`}</span>
      </p>
    </div>
  );
}
