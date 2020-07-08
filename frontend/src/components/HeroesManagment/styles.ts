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

  > div {
    display: grid;
    grid-template-columns: 175px 80px 175px 175px 175px;

    text-align: center;

    p,
    strong {
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 3px 0;
    }

    a {
      text-decoration: none;
      background: var(--blue1);
      color: var(--secondary);
      border: 0;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${shade(0.2, '#2a4474')};
      }
    }

    button {
      margin-left: 10px;
      background: var(--blue1);
      color: var(--secondary);
      border: 0;
      padding: 4px 8px;
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

export const Register = styled.div`
  width: 100%;
  margin-bottom: 15px;

  display: flex;

  a {
    text-decoration: none;
    font-size: 16px;
    margin-left: auto;
    background: var(--blue1);
    color: var(--secondary);
    border: 0;
    padding: 9.5px 12px;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: ${shade(0.2, '#2a4474')};
    }
  }
`;
