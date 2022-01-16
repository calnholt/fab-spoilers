import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCardResults } from "./card-results-list.context";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
const CardContainer = styled.div`
  margin: 0.5rem;
  cursor: pointer;
  position: relative;
`;
const Title = styled.div`
  text-align: center;
`;
const Image = styled.img`
  width: 100%;
  max-height: 25rem;
  transition: opacity ease-in-out 0.08s;
  
  :hover {
    opacity: 0.5;
  }
`;
const HoverImage = styled.div`
  transition: color ease-in-out 0.08s;
  position: absolute;
  top: 118px;
  right: 108px;
  font-size: 67px;
  color: #3e3e3e;
`;

export const CardResultsList: React.FC = () => {
  const { cardResultsState } = useCardResults();

  return (
    <Container>
      {cardResultsState.searchResults.map(card => {
        return (
          <CardResult card={card} />
        );
      })}
    </Container>
  );
};

type CardResultProps = {
  card: Record<string, any>,
}

export const CardResult: React.FC<CardResultProps> = ({card}) => {
  const [hovering, setHovering] = useState<boolean>(false);

  return (
    <CardContainer key={card._key}>
      <Title>{card.name}</Title>
      <Image 
        onMouseOver={() => setHovering(!hovering)} 
        onMouseLeave={() => setHovering(!hovering)} 
        src={card.image}
      />
      {hovering && (
        <HoverImage>
          <FontAwesomeIcon icon={faPlusCircle} />
        </HoverImage>
      )}
    </CardContainer>
  );
}