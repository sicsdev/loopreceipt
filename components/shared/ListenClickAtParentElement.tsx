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
  return <div ref={parentRef}>{func(childClick)}</div>;
};
export default ListenClickAtParentElement;
