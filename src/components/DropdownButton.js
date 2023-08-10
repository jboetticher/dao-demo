import styled from 'styled-components';

const DropdownButton = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;

  &::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-left: 2px solid var(--text);
    border-bottom: 2px solid var(--text);
    border-color: ${props => (props.opened ? 'var(--orange)' : 'white')};
    transform: ${props => (props.opened ? 'rotate(135deg)' : 'rotate(-45deg)')};
    transition: transform 0.3s ease, border-color 0.3s ease;
  }
`;

export default DropdownButton;