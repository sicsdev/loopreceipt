import { useRef } from "react";
const ListenClickAtParentElement = (
  onClick: React.MouseEventHandler<any>,
  func: (childClick: React.MouseEventHandler<any>) => JSX.Element
) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childClick: React.MouseEventHandler<any> = (e) => {
    e.target = parentRef.current as EventTarget;
    onClick(e);
  };
  return (
    <span
      ref={parentRef}
      style={
        {
          // border: "2px solid red",
          // enable border check where this is used in the page
        }
      }
    >
      {func(childClick)}
    </span>
  );
};
export default ListenClickAtParentElement;
