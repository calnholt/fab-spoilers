import React from 'react';
import './App.css';
import { EasybaseProvider } from 'easybase-react';
import ebconfig from './ebconfig';
import styled from 'styled-components';
import { CardListView } from './modules/card-results-list/card-list-view.component';

const Container = styled.div`
  min-height: 840px;
  max-width: 1520px;
  margin-left 9rem;
  margin-right 9rem;
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

const App = () => {
  return (
    <Container>
      <EasybaseProvider ebconfig={ebconfig}>
        <CardListView />
      </EasybaseProvider>
    </Container>
  );
}

export default App;
