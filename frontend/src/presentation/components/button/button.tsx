import { Text } from "../text/text";
import { CustomButton } from "./button.styles";
import { type IButton } from "./button.types";
import { getTextVariantColor } from "./mappers";

export const Button: React.FC<IButton> = ({
    variant = "primary",
    children,
    ...rest
}) => {
    return (
        <CustomButton variant={variant} {...rest}>
            <Text size="18" weight="500" color={getTextVariantColor(variant)}>
                {children}
            </Text>
        </CustomButton>
    );
};