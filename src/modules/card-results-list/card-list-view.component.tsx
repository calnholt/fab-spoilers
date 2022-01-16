import React from "react"
import { CardResultsList } from "./card-results-list.component"
import { CardResultsContextProvider } from "./card-results-list.context"
import { CardFilters } from "./card-filters.component"


export const CardListView: React.FC = ({}) => {
  return (
    <CardResultsContextProvider>
      <CardFilters />
      <CardResultsList />
    </CardResultsContextProvider>
  )
}