import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import store from "@store/store";
export interface ModalOptionsType {
  translations?: {
    x?: number;
    y?: number;
  };
  translationsFrom?: "cursor" | "element";
  positionWRTPoint?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
  };
}
export interface SliceModalType {
  show: boolean;
  mouseEvent?: {
    clientX?: number;
    clientY?: number;
    anchorBox?: {
      top: number;
      left: number;
      height: number;
      width: number;
    };
  };
  options?: ModalOptionsType;
}
const initialState: SliceModalType = {
  show: false,
};
export const modalStateSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<{ show: boolean }>) => {
      state.show = action.payload.show;
    },
    setMouseEvent: (
      state,
      action: PayloadAction<{ mouseEvent: SliceModalType["mouseEvent"] }>
    ) => {
      state.mouseEvent = action.payload.mouseEvent;
    },
    setOptions: (
      state,
      action: PayloadAction<{ options?: ModalOptionsType }>
    ) => {
      state.options = action.payload.options;
    },
  },
});
export const {
  setShow: setShowModal,
  setMouseEvent,
  setOptions: setModalOptions,
} = modalStateSlice.actions;
export const openModal = (
  e: React.MouseEvent<any, MouseEvent>,
  options?: ModalOptionsType
) => {
  // console.log(e);
  if (e) {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const box = target.getBoundingClientRect();
    store.dispatch(
      setMouseEvent({
        mouseEvent: {
          clientX: e.clientX,
          clientY: e.clientY,
          anchorBox: {
            top: box.top,
            left: box.left,
            height: box.height,
            width: box.width,
          },
        },
      })
    );
  }
  store.dispatch(setModalOptions({ options }));
  store.dispatch(setShowModal({ show: true }));
  // store.getState().notifications.showNotificationsBox,
  // we can get the state like this
};
export const closeModal = () => {
  store.dispatch(setShowModal({ show: false }));
};
export default modalStateSlice.reducer;
