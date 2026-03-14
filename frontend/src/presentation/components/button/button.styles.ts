import { css, styled } from "styled-components";

import { formatPxToRem } from "../../helpers/format-css-value/format-px-to-rem";
import { type ICustomButton } from "./button.types";
import { getBackgroundVariantColor } from "./mappers";

const secondaryStyles = css`
    border: ${formatPxToRem(1)}rem solid
        ${({ theme }) => theme.colors.neutrals.default};
`;

export const CustomButton = styled.button<ICustomButton>`
    border: none;

    width: 100%;

    align-items: center;
    justify-content: center;

    padding: ${formatPxToRem(16)}rem ${formatPxToRem(24)}rem;

    border-radius: ${formatPxToRem(12)}rem;

    background-color: ${({ variant }) => getBackgroundVariantColor(variant)};

    cursor: pointer;

    ${({ variant }) => variant === "secondary" && secondaryStyles}
`;
