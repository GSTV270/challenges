import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  margin: 15px auto 0;
  max-width: 1100px;
  width: 100%;
  height: calc(100% - 72px);
  display: flex;
`;

export const Menu = styled.div`
  width: 278px;
  display: flex;
  flex-direction: column;

  button {
    background: none;
    border: none;
    color: var(--secondary);
    margin: 5px 10px;
    padding: 10px 20px;
    border-radius: 5px;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f5f5f5')};
      cursor: pointer;
    }
  }

  button.selected {
    background: var(--blue2);

    &:hover {
      color: var(--secondary);
      cursor: default;
    }
  }
`;

export const Data = styled.div`
  border-left: 1px solid var(--secondary);
`;
