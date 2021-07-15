import { runSequentiallyAfterDelay } from "@helpers/utils";
import { makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

interface MovableModalProps {
  children: JSX.Element | string;
  mouseEvent?: React.MouseEvent<any, MouseEvent>;
  translations?: {
    x: number;
    y: number;
  };
  translationsFrom?: "cursor" | "element";
  positionWRTPoint?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
  };
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const MovableModal = ({
  children,
  mouseEvent,
  translations = {
    x: 0,
    y: 0,
  },
  translationsFrom = "cursor",
  positionWRTPoint = {
    top: false,
    right: false,
    bottom: false,
    left: false,
  },
  showModal,
  setShowModal,
}: MovableModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const styles = useStyles();
  const [position, setPosition] = useState<{ top?: string; left?: string }>({});
  useEffect(() => {
    runSequentiallyAfterDelay(
      [
        () => {
          if (!modalRef.current) return;
          modalRef.current.style.transition = "";
          modalRef.current.style.transform = `translate(${translations.x}px, ${translations.y}px)`;
        },
        () => {
          if (!modalRef.current) return;

          let modalBox = modalRef.current.getBoundingClientRect();

          switch (translationsFrom) {
            case "cursor": {
              // in case of cursor position bottom right is default
              // so in that case we don't need to do anything
              if (mouseEvent) {
                let pos = {
                  top: mouseEvent.clientY,
                  left: mouseEvent.clientX,
                };

                if (positionWRTPoint.top) {
                  pos.top -= modalBox.height;
                }
                if (positionWRTPoint.left) {
                  pos.left -= modalBox.width;
                }
                setPosition({
                  top: pos.top + "px",
                  left: pos.left + "px",
                });
              }

              break;
            }
            case "element": {
              const elementClicked: any = mouseEvent?.target;
              // console.dir(elementClicked);

              if (elementClicked) {
                let pos = {
                  top: elementClicked.offsetTop,
                  left: elementClicked.offsetLeft,
                };
                if (positionWRTPoint.top) {
                  pos.top -= modalBox.height;
                }
                if (positionWRTPoint.right) {
                  pos.left += elementClicked.offsetWidth;
                }
                if (positionWRTPoint.bottom) {
                  pos.top += elementClicked.offsetHeight;
                }
                if (positionWRTPoint.left) {
                  pos.left -= modalBox.width;
                }
                setPosition({
                  top: pos.top + "px",
                  left: pos.left + "px",
                });
              }
              break;
            }
          }
        },
        () => {
          // we wrapped this code in setTimeout
          // to ensure that we get updated modalBox after
          // positions are changed
          if (!modalRef.current) return;
          const modalBox = modalRef.current.getBoundingClientRect();
          // console.log(modalBox);
          // console.log(window.innerWidth);
          // console.log(modalBox.left + modalBox.width);
          let shiftX = translations.x;
          let shiftY = translations.y;
          const offsetHorizontal =
            modalBox.left + modalBox.width - window.innerWidth;
          const offsetVertical =
            modalBox.top + modalBox.height - window.innerHeight;
          if (modalBox.left < 0) shiftX = -modalBox.left;
          else if (offsetHorizontal > 0) shiftX = -offsetHorizontal;
          if (modalBox.top < 0) shiftY = -modalBox.top;
          else if (offsetVertical > 0) shiftY = -offsetVertical;
          modalRef.current.style.transition = "all 100ms ease";
          modalRef.current.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
        },
      ],
      1
    );
  }, [mouseEvent]);
  useEffect(() => {
    const closeDialog = () => {
      setShowModal(false);
    };
    window.addEventListener("click", closeDialog);
    return () => {
      window.removeEventListener("click", closeDialog);
    };
  }, []);

  return showModal ? (
    <div
      className={styles.MovableModal}
      ref={modalRef}
      onClick={(e) => {
        // console.log(e.target);
        e.stopPropagation();
        // so that we can listen click on inner elements and not close the window
      }}
      style={{
        ...position,
        transform: `translate(${translations.x}px, ${translations.y}px)`,
      }}
    >
      {children}
    </div>
  ) : null;
};
export default MovableModal;
const useStyles = makeStyles((theme) => ({
  MovableModal: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 10,
  },
}));
