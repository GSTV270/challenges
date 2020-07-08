import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  padding: 10px 0;

  background: var(--background);
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    background-color: var(--blue4);
    color: var(--background);
    padding: 3px 6px;
    border-radius: 5px;
  }
`;

export const Nav = styled.div`
  max-width: 300px;
  width: 100%;

  display: flex;
  justify-content: space-between;

  div {
    a {
      text-decoration: none;
      color: var(--secondary);
      font-size: 20px;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f5f5f5')};
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;

  a {
    width: 150px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    text-decoration: none;
    color: var(--secondary);
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f5f5f5')};
    }
  }

  button {
    background: var(--blue1);
    color: var(--secondary);
    border: 0;
    padding: 1px 4px;
    border-radius: 4px;
    margin-top: 5px;
    transition: background 0.2s;

    &:hover {
      background: ${shade(0.2, '#2a4474')};
    }
  }
`;
