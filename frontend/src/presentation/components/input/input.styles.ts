import { styled } from "styled-components";

import { formatPxToRem } from "../../helpers/format-css-value/format-px-to-rem";
import type { IInputWrapper } from "./input.types";
import { getInputVariantColor } from "./mappers";

export const InputWrapper = styled.div<IInputWrapper>`
    display: flex;
    align-items: center;
    padding: ${formatPxToRem(16)}rem ${formatPxToRem(24)}rem;

    border-radius: ${formatPxToRem(8)}rem;

    background-color: ${({ theme }) => theme.colors.neutrals.inverted};

    border: ${formatPxToRem(2)}rem solid
        ${({ variant }) => getInputVariantColor(variant)};

    width: 100%;
`;

export const CustomInput = styled.input`
    border: none;

    background-color: ${({ theme }) => theme.colors.neutrals.inverted};

    width: 100%;

    font-family: ${({ theme }) => theme.fonts.poppins};

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${({ theme }) => theme.colors.neutrals.weakness};
    }
`;
