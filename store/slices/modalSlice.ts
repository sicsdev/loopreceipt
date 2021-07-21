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
    anchorBox?: DOMRect;
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
export const { setShow, setMouseEvent, setOptions } = modalStateSlice.actions;
export const openModal = (
  e: React.MouseEvent<any, MouseEvent> | undefined,
  options?: ModalOptionsType
) => {
  // console.log(e);
  if (e) {
    e.stopPropagation();
    const target: any = e.target;
    store.dispatch(
      setMouseEvent({
        mouseEvent: {
          clientX: e.clientX,
          clientY: e.clientY,
          anchorBox: target.getBoundingClientRect(),
        },
      })
    );
  }
  store.dispatch(setOptions({ options }));
  store.dispatch(setShow({ show: true }));
};
export const closeModal = () => {
  store.dispatch(setShow({ show: false }));
};
export default modalStateSlice.reducer;
