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
