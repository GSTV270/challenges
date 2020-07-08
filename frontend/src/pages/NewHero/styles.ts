import styled from 'styled-components';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      max-width: 1120px;
      width: 100%;
      margin: 0 auto;

      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;

  max-width: 1120px;
  width: 100%;
  margin: 30px auto 0;

  .leaflet-container {
    flex: 1;

    width: 100%;
    height: 377px;
    border-radius: 8px;
  }
`;

export const Information = styled.div`
  width: 40%;
  height: 100%;
  padding: 0 20px;

  font-size: 20px;

  div {
    display: flex;
    flex-direction: column;

    strong {
      padding: 0 4px;
    }

    input {
      font-size: 20px;
      margin-top: 3px;
      background: var(--background);
      color: var(--secondary);
      padding: 8px 16px;
      border: 0;
      border-radius: 6px;
    }

    & + div {
      margin-top: 15px;
    }
  }
`;
