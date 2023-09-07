import { createContext, useState } from "react";
import { getAccessTokenFromLS } from "src/utils/auth";

interface AppContextInterface {}

export const getInitialAppContext: () => AppContextInterface = () => ({});

const initialAppContext = getInitialAppContext();

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({
  defaultValue = initialAppContext,
}: {
  defaultValue?: AppContextInterface;
}) => {
  return <AppContext.Provider value={{}}></AppContext.Provider>;
};
