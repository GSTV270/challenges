import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 700px;
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
    grid-template-columns: 202px 110px 156px 156px 156px;

    text-align: center;

    p,
    strong {
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 3px 0;
    }

    & + div {
      border-top: 1px solid var(--blue1);
      padding-top: 12px;
      margin-top: 12px;
    }
  }
`;

export const Update = styled.div`
  display: flex;
  padding: 0 15px 15px;
  white-space: nowrap;

  > div {
    display: flex;
    align-items: center;

    button {
      background: var(--blue1);
      height: 40px;
      width: 40px;
      border-radius: 4px;
      border: 0;
      color: #fbfff1;
      font-weight: 500;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#2a4474')};
      }
    }

    p {
      margin-left: 10px;
    }
  }
`;
