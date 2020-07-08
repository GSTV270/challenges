import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 755px;
  overflow-y: auto;
  padding: 0 15px;

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--secondary);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: var(--gray);
  }

  div {
    display: grid;
    grid-template-columns: 150px 80px 120px 120px 180px 130px;

    text-align: center;

    p,
    strong {
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 3px 0;
    }

    a {
      height: 28px;
      text-decoration: none;
      background: var(--blue1);
      color: var(--secondary);
      border: 0;
      padding: 2px 4px;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${shade(0.2, '#2a4474')};
      }
    }

    & + div {
      border-top: 1px solid var(--blue1);
      padding-top: 12px;
      margin-top: 12px;
    }
  }
`;
