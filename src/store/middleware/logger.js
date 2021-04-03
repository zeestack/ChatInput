const logger = (store) => (next) => (action) => {
  console.log("Logging state: ", store.getState());
  next(action);
};

export default logger;
