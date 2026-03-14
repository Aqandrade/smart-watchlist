import { styled } from "styled-components";

import { formatPxToRem } from "../../helpers/format-css-value/format-px-to-rem";
import { getColor } from "../../themes/mappers";
import { type ICustomText } from "./text.types";

export const CustomText = styled.span<ICustomText>`
    color: ${({ color }) => getColor(color)};
    font-weight: ${({ weight }) => weight};
    font-size: ${({ size }) => formatPxToRem(Number(size))}rem;
    text-align: ${({ align }) => align};
`;
