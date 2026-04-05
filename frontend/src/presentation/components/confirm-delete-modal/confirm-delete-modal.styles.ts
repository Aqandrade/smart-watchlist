import { styled } from "styled-components";
import { formatPxToRem } from "../../helpers/format-css-value/format-px-to-rem";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: ${formatPxToRem(16)}rem;

    padding: ${formatPxToRem(8)}rem ${formatPxToRem(4)}rem;
`;

export const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: ${formatPxToRem(56)}rem;
    height: ${formatPxToRem(56)}rem;

    border-radius: 50%;

    background-color: ${({ theme }) => theme.colors.red.default}1A;
`;

export const TextBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: ${formatPxToRem(8)}rem;

    text-align: center;
`;

export const Actions = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(12)}rem;

    width: 100%;

    margin-top: ${formatPxToRem(8)}rem;
`;

export const DangerButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    flex: 1;

    padding: ${formatPxToRem(16)}rem ${formatPxToRem(24)}rem;

    border: none;
    border-radius: ${formatPxToRem(12)}rem;
    cursor: pointer;

    background-color: ${({ theme }) => theme.colors.red.default};

    transition: opacity 0.15s ease;

    &:hover {
        opacity: 0.85;
    }
`;

export const CancelButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    flex: 1;

    padding: ${formatPxToRem(16)}rem ${formatPxToRem(24)}rem;

    border: ${formatPxToRem(1)}rem solid ${({ theme }) => theme.colors.neutrals.default};
    border-radius: ${formatPxToRem(12)}rem;
    cursor: pointer;

    background-color: transparent;

    transition: opacity 0.15s ease;

    &:hover {
        opacity: 0.7;
    }
`;
