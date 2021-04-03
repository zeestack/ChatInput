const { commentAdded } = require("./store/comments");
const { storeCreator } = require("./store/storeCreator");

const store = storeCreator();

const unsubscribe = store.subscribe(() => {
  console.log("Store Changed!", store.getState());
});

store.dispatch(commentAdded({ name: "Project 1" }));
