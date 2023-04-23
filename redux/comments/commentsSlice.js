import { createSlice } from "@reduxjs/toolkit";

const state = {};

export const commentsSlice = createSlice({
  name: "comments",
  initialState: state,
  reducers: {
    updateCommentsQuantity: (state, { payload }) => {
      const { postId, commentsQuantity } = payload;
      state[postId] = commentsQuantity;
    },
  },
});

const updateCommentsQuantityAction =
  (postId, commentsQuantity) => async (dispatch, getState) => {
    dispatch(
      commentsSlice.actions.updateCommentsQuantity({ postId, commentsQuantity })
    );
  };

export { updateCommentsQuantityAction };
