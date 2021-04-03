import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let commentId = 0;

const slice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    commentAdded: (comments, action) => {
      if (!action.payload.userId) return comments;
      comments.push({
        id: ++commentId,
        userId: action.payload.userId,
        name: action.payload.name,
        dateCreated: Date.now(),
        body: action.payload.body,
      });
    },
    commentDeleted: (comments, action) => {
      if (!action.payload.userId) return comments;

      const id = action.payload.id;
      const userId = action.payload.userId;
      const comIndex = comments.findIndex((com) => com.id === id);
      const comment = comments[comIndex];
      if (comment.userId !== userId) return comments;
      return comments.filter((comment) => comment.id !== action.payload.id);
    },
    commentModified: (comments, action) => {
      if (!action.payload.userId) return comments;

      const id = action.payload.id;
      const userId = action.payload.userId;
      const comIndex = comments.findIndex((com) => com.id === id);
      const comment = comments[comIndex];
      if (comment.userId !== userId) return comments;
      comments[comIndex].body = action.payload.body;
      comments[comIndex].date = Date.now();
      return comments;
    },
  },
});

export const { commentAdded, commentDeleted, commentModified } = slice.actions;
export default slice.reducer;

export const getComments = createSelector(
  (state) => state.entities.comments,
  (comments) => comments
);

export const getUserComments = (userId) =>
  createSelector(
    (state) => state.entities.comments,
    (comments) => comments.filter((com) => com.id === userId)
  );
