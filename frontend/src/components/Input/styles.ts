import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--background);
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid var(--background);
  color: var(--placeholder);

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${({ isErrored }) =>
    isErrored &&
    css`
      border-color: var(--red);
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      color: var(--blue2);
      border-color: var(--blue2);
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      color: var(--blue2);
    `}

  input {
    color: #fbfff1;
    flex: 1;
    border: 0;
    background: transparent;

    &::placeholder {
      color: var(--placeholder);
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: var(--red);
    color: var(--white);

    &:before {
      border-color: var(--red) transparent;
    }
  }
`;
