import React, { useReducer, createContext } from "react";
import { useContext } from "react";
import { SearchFields } from "./card-filters.component";

type CardResultsState = {
  searchResults: Record<string, any>[],
  searchFields: SearchFields,
};

type CardResultsContext = {
  cardResultsState: CardResultsState,
  dispatchCardResults: React.Dispatch<any>;
};

const initialState: CardResultsState = {
  searchResults: [],
  searchFields: null,
};

const CardResultsContext = createContext<CardResultsContext>({
  cardResultsState: initialState,
  dispatchCardResults: null,
});

const CardResultAction = {
  SEARCH: "SEARCH",
  CLEAR: "CLEAR",
  FILTERS_UPDATED: "FILTERS_UPDATED",
}

const reducer = (state: CardResultsState, action: any) => {
  switch(action.type) {
    case CardResultAction.SEARCH:
      return {
        ...state,
        searchResults: action.payload,
      };
    case CardResultAction.FILTERS_UPDATED:
      const fieldsCopy = {...state.searchFields, ...action.payload};
      Object.keys(action.payload).forEach(key => {
        if (!action.payload[key] || !action.payload[key].length) {
          delete fieldsCopy[key];
        }
      });
      return {
        ...state,
        searchFields: {...fieldsCopy},
      };
    default:
      return {...state};
  }
};

const CardResultsContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CardResultsContext.Provider
      value={{
        cardResultsState: state, 
        dispatchCardResults: dispatch,
      }}
    >
      {children}
    </CardResultsContext.Provider>
  )
};

const useCardResults = (): CardResultsContext => {
  const context = useContext<CardResultsContext>(CardResultsContext);

  if (context == undefined) {
    throw new Error("useCardResults must be used within a CardResultsContextProvider");
  }

  return context;
}

export { CardResultsContextProvider, useCardResults, CardResultAction};