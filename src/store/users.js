import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let userId = 0;

const slice = createSlice({
  name: "users",
  initialState: { currentUser: {}, users: [] },
  reducers: {
    userAdded: (state, action) => {
      const { users } = state;
      if (users.findIndex((user) => user.name === action.payload.name) === -1)
        users.push({
          userId: ++userId,
          name: action.payload.name,
          dateCreated: Date.now(),
        });
    },
    userDeleted: (state, action) => {
      const { users } = state;
      return users.filter((user) => user.userId !== action.payload.id);
    },
    userModified: (state, action) => {
      const { users } = state;
      const userId = action.payload.userId;
      const userIndex = users.findIndex(
        (user) => user.userId.toString() === userId
      );
      users[userIndex].name = action.payload.name;
      users[userIndex].date = Date.now();
      return users;
    },

    signIn: (state, action) => {
      let { users } = state;
      const user = users.find(
        (u) => u.userId.toString() === action.payload.userId
      );

      if (user) {
        state.currentUser = user;
        state.users = users;
      } else {
        state.currentUser = {};
        state.users = users;
      }
    },
  },
});

export const { userAdded, userDeleted, userModified, signIn } = slice.actions;
export default slice.reducer;

export const getUsers = createSelector(
  (state) => state.entities.users.users,
  (users) => users
);

export const getCurrUser = createSelector(
  (state) => state.entities.users.currentUser,
  (currentUser) => currentUser
);
