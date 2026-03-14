import { styled } from "styled-components";
import { formatPxToRem } from "../../helpers/format-css-value/format-px-to-rem";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    gap: ${formatPxToRem(8)}rem;

    margin-top: ${formatPxToRem(24)}rem;
    margin-bottom: ${formatPxToRem(40)}rem;
`;

export const PageButton = styled.button<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: ${formatPxToRem(36)}rem;
    height: ${formatPxToRem(36)}rem;

    border-radius: ${formatPxToRem(8)}rem;

    border: ${({ isActive, theme }) =>
        isActive
            ? "none"
            : `${formatPxToRem(1)}rem solid ${theme.colors.neutrals.weak}`};

    background-color: ${({ isActive, theme }) =>
        isActive ? theme.colors.purple.default : "transparent"};

    color: ${({ isActive, theme }) =>
        isActive ? theme.colors.white.default : theme.colors.neutrals.default};

    cursor: pointer;

    font-size: ${formatPxToRem(14)}rem;
    font-weight: 500;

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

export const ArrowButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width: ${formatPxToRem(36)}rem;
    height: ${formatPxToRem(36)}rem;

    border-radius: ${formatPxToRem(8)}rem;

    border: ${formatPxToRem(1)}rem solid
        ${({ theme }) => theme.colors.neutrals.weak};

    background-color: transparent;

    cursor: pointer;

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;
