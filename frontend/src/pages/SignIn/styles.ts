import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  form {
    width: 340px;
    text-align: center;

    h2 {
      margin-bottom: 24px;
    }

    a {
      color: var(--secondary);
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-right: 16px;
      }

      &:hover {
        color: ${shade(0.2, '#fbfff1')};
      }
    }
  }
`;

export const Title = styled.div`
  margin-bottom: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    background-color: var(--blue4);
    color: var(--blue0);
    padding: 6px 12px;
    border-radius: 5px;
  }
`;
