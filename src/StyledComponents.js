import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2em;
`;

export const Header = styled.header`
  color: white;
  font-size: 1.5em;
  text-align: center;
  width: 100%;
  background-color: var(--green);
  text-shadow: 2px 2px 0 var(--orange);
  padding: 1rem;
  font-family: 'Space Mono', sans-serif;
  text-transform: uppercase;
  font-weight: bold;
`;

export const ProposalList = styled.div`
  width: 48%;
  overflow: auto;
`;

export const BigCardContainer = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BigCard = styled.div`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex: 1;
  margin-bottom: 1em;
  padding: 1em;
  color: white; /* set text color */
`;

export const ProposalCard = styled.div`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1em;
  padding: 1em;
  color: white; /* set text color */
`;

export const CardTitle = styled.div`
  font-family: 'Space Mono', sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 0 var(--orange);
  font-size: 24px;
  margin-bottom: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1em;
`;

export const StyledButton = styled.button`
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: magenta;
  }
`;