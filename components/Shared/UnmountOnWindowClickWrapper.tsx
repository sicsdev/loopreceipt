import { useEffect } from "react";

interface UnmountOnWindowClickWrapperProps {
  children: JSX.Element | string;
  close: () => void;
}
const UnmountOnWindowClickWrapper = ({
  children,
  close,
}: UnmountOnWindowClickWrapperProps) => {
  useEffect(() => {
    window.addEventListener("click", close);
    return () => {
      window.removeEventListener("click", close);
    };
  }, []);
  return (
    <div
      onClick={(e) => {
        // console.log("div clicked");
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};
export default UnmountOnWindowClickWrapper;
