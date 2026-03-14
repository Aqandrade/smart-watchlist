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

    padding: ${formatPxToRem(16)}rem ${formatPxToRem(20)}rem;

    background-color: ${({ theme }) => theme.colors.white.default};

    border-radius: ${formatPxToRem(8)}rem;

    gap: ${formatPxToRem(12)}rem;

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

export const RatingWrapper = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(4)}rem;

    white-space: nowrap;
`;
