import styled, { keyframes } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { formatPxToRem } from "../../helpers/format-css-value/format-px-to-rem";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const borderStyles = (theme: DefaultTheme) =>
    `${formatPxToRem(4)}rem solid ${theme.colors.orange.default}`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${formatPxToRem(12)}rem;
`;

export const Spinner = styled.div`
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);

    border-top: ${({ theme }) => borderStyles(theme)};
    border-right: ${({ theme }) => borderStyles(theme)};
    border-bottom: ${({ theme }) => borderStyles(theme)};
    border-left: ${formatPxToRem(4)}rem solid transparent;
    background: transparent;

    width: ${formatPxToRem(42)}rem;
    height: ${formatPxToRem(42)}rem;

    border-radius: 50%;
`;
