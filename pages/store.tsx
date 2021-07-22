import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "@store/slices/userSlice";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchPosts } from "@store/slices/postsSlice";

export default function Landing() {
  //   const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  //   const user = useSelector(getUser);
  const user = useAppSelector((state) => state.user);
  const posts = useAppSelector((state) => state.posts);
  console.log(posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

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
