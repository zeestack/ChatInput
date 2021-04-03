import React, { useContext } from "react";
import storeCreator from "./../store/storeCreator";

export const StoreContext = React.createContext();
export const StoreContextProvider = StoreContext.Provider;
export const StoreContextConsumer = StoreContext.Consumer;

export function useStore() {
  return useContext(StoreContext);
}

export const StoreProvider = ({ children }) => {
  const store = storeCreator();
  return <StoreContextProvider value={store}>{children}</StoreContextProvider>;
};
