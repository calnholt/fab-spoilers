
import React from "react";
import styled from "styled-components";
import Select, { MultiValue } from 'react-select';
import { CARD_TYPES, CLASS_TYPES, RARITY_TYPES, SET_TYPES, TALENT_TYPES } from "../../types/card-types";
import { useEffect } from "react";
import { useEasybase } from "easybase-react";
import { CardResultAction, useCardResults } from "./card-results-list.context";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
const Label = styled.div`

`;

const FilterContainer = styled.div`
  width: 25rem;
  margin-right: 2rem;
`;

interface Filter {
  label: string;
  options: (number | string)[]
  property: string;
};

export type SearchFields = { 
  cardType: string[];
  rarity: string[];
  talent: string[];
  class: string[];
  set: string[];
}

export const CardFilters: React.FC = ({}) => {
  const { db } = useEasybase();
  const { cardResultsState, dispatchCardResults } = useCardResults();

  //TODO: update order of filters
  const filters: readonly Filter[] = [
    {
      label: "Card Type",
      options: CARD_TYPES,
      property: "cardType",
    },
    {
      label: "Rarity",
      options: RARITY_TYPES,
      property: "rarity",
    },
    {
      label: "Talent",
      options: TALENT_TYPES,
      property: "talent",
    },
    {
      label: "Class",
      options: CLASS_TYPES,
      property: "class",
    },
    {
      label: "Set",
      options: SET_TYPES,
      property: "setName",
    },
    {
      label: "Pitch",
      options: [0,1,2,3],
      property: "pitch"
    },
    {
      label: "Attack",
      options: [1,2,3,4,5,6,7,8,9,10,11,12],
      property: "attack",
    },
    {
      label: "Defense",
      options: ["None",0,1,2,3,4,5,6,7,8,9,10,11,12],
      property: "defense"
    }
  ];

  const search = () => {
    const searchAll = cardResultsState.searchFields == null || Object.keys(cardResultsState.searchFields).length === 0;
    if (searchAll) {
      db('CARDS').return().all().then(data => {
        dispatchCardResults({
          type: CardResultAction.SEARCH,
          payload: data,
        });
      })
    }
    else {
      db('CARDS').return().where(cardResultsState.searchFields).all().then(data => {
        dispatchCardResults({
          type: CardResultAction.SEARCH,
          payload: data,
        });
      })
    }
  }

  const updateFilters = async (property: string, values: MultiValue<{value: any, label: any}>) => {
    let payload = null;
    if (values.length) {
      payload = values.map(v => v.value);
    }
    dispatchCardResults({
      type: CardResultAction.FILTERS_UPDATED,
      payload: {[property]: payload},
    });
  }

  useEffect(() => {
      search();
  }, [cardResultsState.searchFields])

  return (
    <Container>
      {filters.map(filter => {
        return (
          <FilterContainer>
            <Label>{filter.label}</Label>
            <Select
              isMulti
              name={filter.label}
              options={filter.options.map(option => { return {label: option, value: option}})}
              onChange={(newValue) => updateFilters(filter.property, newValue)}
            />
          </FilterContainer>
        );
      })}
    </Container>
  )
}