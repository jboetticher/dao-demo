import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2em;
`;

export const Header = styled.header`
  color: white;
  font-size: 2em;
  text-align: center;
  width: 100%;
  background-color: purple;
  padding: 1rem;
`;

export const ProposalList = styled.div`
  width: 45%;
  overflow: auto;
`;

export const BigCardContainer = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BigCard = styled.div`
  flex: 1;
  border: 1px solid white;
  margin-bottom: 1em;
  padding: 1em;
`;

export const ProposalCard = styled.div`
  border: 1px solid white;
  margin-bottom: 1em;
  padding: 1em;
  border-radius: 8px;
  background-color: #F0F0F0;
`;

export const CardTitle = styled.div`
  color: white;
  font-size: 2em;
  text-align: center;
  width: 100%;
  background-color: purple;
  padding: 1rem;
`;