import { runSequentiallyAfterDelay } from "@helpers/utils";
import { makeStyles } from "@material-ui/core";
import { ModalOptionsType, SliceModalType } from "@store/slices/modalSlice";
import React, { useEffect, useRef, useState } from "react";

export interface MovableModalProps {
  children: JSX.Element | string;
  mouseEvent?: SliceModalType["mouseEvent"];
  translations: NonNullable<ModalOptionsType["translations"]>; // this will remove undefined from ModalOptionsType["translations"] type
  translationsFrom?: ModalOptionsType["translationsFrom"];
  positionWRTPoint?: ModalOptionsType["positionWRTPoint"];
  showModal: boolean;
  closeModal: () => void;
}
const MovableModal = ({
  children,
  mouseEvent,
  translations,
  translationsFrom = "element",
  positionWRTPoint = {
    top: false,
    right: false,
    bottom: true,
    left: false,
  },
  showModal,
  closeModal,
}: MovableModalProps) => {
  // console.log(mouseEvent);
  const modalRef = useRef<HTMLDivElement>(null);
  const styles = useStyles();
  const [position, setPosition] = useState<{ top?: string; left?: string }>({});
  // when we give only x then y will default to 0 not undefined and vice-versa
  translations = {
    x: translations?.x ?? 0,
    y: translations?.y ?? 0,
  };
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
              if (mouseEvent && mouseEvent.clientX && mouseEvent.clientY) {
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
              const anchorBox = mouseEvent?.anchorBox;
              // console.dir(elementClicked);

              if (anchorBox) {
                let pos = {
                  top: anchorBox.top,
                  left: anchorBox.left,
                };
                if (positionWRTPoint.top) {
                  pos.top -= modalBox.height;
                }
                if (positionWRTPoint.right) {
                  pos.left += anchorBox.width;
                }
                if (positionWRTPoint.bottom) {
                  pos.top += anchorBox.height;
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
    window.addEventListener("click", closeModal);
    return () => {
      window.removeEventListener("click", closeModal);
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
    zIndex: 100,

    animation: "$show 200ms ease",
  },
  "@keyframes show": {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
}));
