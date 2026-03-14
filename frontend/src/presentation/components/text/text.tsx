import { CustomText } from "./text.styles";
import { type IText } from "./text.types";

export const Text: React.FC<IText> = ({
    color = "neutrals-default",
    align = "flex-start",
    children,
    weight,
    size,
    ...rest
}) => {
    return (
        <CustomText
            weight={weight}
            align={align}
            color={color}
            size={size}
            {...rest}
        >
            {children}
        </CustomText>
    );
};