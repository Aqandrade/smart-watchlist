import { styled } from "styled-components";
import { formatPxToRem } from "../../helpers/format-css-value/format-px-to-rem";

export const Card = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    cursor: pointer;
    transition: transform 0.15s ease;

    &:hover {
        transform: scale(1.01);
    }

    width: 100%;

    padding: ${formatPxToRem(20)}rem ${formatPxToRem(24)}rem;

    background-color: ${({ theme }) => theme.colors.white.default};

    border-radius: ${formatPxToRem(8)}rem;

    gap: ${formatPxToRem(16)}rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const MovieInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    gap: ${formatPxToRem(4)}rem;
`;

export const MovieHeader = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(12)}rem;
`;

export const MovieMeta = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(16)}rem;

    margin-top: ${formatPxToRem(4)}rem;
`;

export const MetaItem = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(4)}rem;
`;

export const Providers = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(8)}rem;

    margin-top: ${formatPxToRem(8)}rem;
`;

export const ProviderBadge = styled.span`
    display: flex;
    align-items: center;

    padding: ${formatPxToRem(4)}rem ${formatPxToRem(12)}rem;

    border-radius: ${formatPxToRem(16)}rem;

    background-color: ${({ theme }) => theme.colors.purple.default};
`;

export const StatusBadge = styled.div`
    display: flex;
    align-items: center;

    padding: ${formatPxToRem(4)}rem ${formatPxToRem(12)}rem;

    border-radius: ${formatPxToRem(16)}rem;

    background-color: ${({ theme }) => theme.colors.input.background.default};
`;

export const RatingWrapper = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(4)}rem;

    white-space: nowrap;
`;

export const CardRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;

    gap: ${formatPxToRem(12)}rem;

    @media (max-width: 768px) {
        flex-direction: row;
        align-items: center;
        width: 100%;
    }
`;

export const CardMeta = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(8)}rem;
`;

export const CardActions = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(8)}rem;
`;

export const ActionButton = styled.button<{ variant: "status" | "delete" }>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: ${formatPxToRem(32)}rem;
    height: ${formatPxToRem(32)}rem;

    border: none;
    border-radius: ${formatPxToRem(6)}rem;
    cursor: pointer;

    transition: opacity 0.15s ease, transform 0.15s ease;

    background-color: ${({ theme, variant }) =>
        variant === "delete"
            ? theme.colors.red.default + "1A"
            : theme.colors.green.default + "1A"};

    &:hover {
        opacity: 0.8;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.97);
    }
`;
