import { useEffect, useRef } from "react";
interface RevealContentProps {
  show: boolean;
  children: JSX.Element;
  delay?: number;
  parentRef: React.RefObject<HTMLDivElement>;
}
const RevealContent = ({
  show,
  children,
  delay = 200,
  parentRef,
}: RevealContentProps) => {
  const childRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.style.overflow = "hidden";
      parentRef.current.style.transition = `all ${delay}ms ease`;
    }
  }, []);
  useEffect(() => {
    if (parentRef.current && childRef.current) {
      const parentHeight = parentRef.current.offsetHeight;
      const childHeight = childRef.current.offsetHeight;
      if (show) {
        parentRef.current.style.maxHeight = parentHeight + childHeight + "px";
      } else {
        // parentRef.current.style.transition = `all ${delay}ms ease`;
        // we can set different cubic bizare for revealing and hiding
        parentRef.current.style.maxHeight = parentHeight - childHeight + "px";
      }
    }
  }, [show]);
  return <div ref={childRef}>{children}</div>;
};
export default RevealContent;
