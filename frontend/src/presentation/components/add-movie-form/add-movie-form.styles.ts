import { styled } from "styled-components";

import { formatPxToRem } from "../../helpers/format-css-value/format-px-to-rem";

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(24)}rem;

    width: 100%;

    padding: ${formatPxToRem(8)}rem 0;
`;

export const FormField = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(8)}rem;
`;

export const ErrorMessage = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(6)}rem;
`;

export const ButtonsRow = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(12)}rem;
`;

export const ResultsList = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(8)}rem;

    max-height: ${formatPxToRem(400)}rem;
    overflow-y: auto;
`;

export const EmptyResults = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: ${formatPxToRem(24)}rem 0;
`;
