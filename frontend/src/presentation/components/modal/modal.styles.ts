import { styled } from "styled-components";
import { formatPxToRem } from "../../helpers/format-css-value/format-px-to-rem";

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.5);

    z-index: 999;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;

    background-color: ${({ theme }) => theme.colors.white.default};

    border-radius: ${formatPxToRem(12)}rem;

    padding: ${formatPxToRem(24)}rem;

    max-width: ${formatPxToRem(600)}rem;
    width: 90%;

    max-height: 80vh;
    overflow-y: auto;

    position: relative;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: ${formatPxToRem(16)}rem;
    right: ${formatPxToRem(16)}rem;

    display: flex;
    align-items: center;
    justify-content: center;

    width: ${formatPxToRem(32)}rem;
    height: ${formatPxToRem(32)}rem;

    border-radius: ${formatPxToRem(16)}rem;

    background-color: ${({ theme }) => theme.colors.input.background.default};

    border: none;
    cursor: pointer;
`;
