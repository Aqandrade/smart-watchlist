import { type TColors } from "../../themes/mappers.types";
import { defaultTheme } from "../../themes/themes";
import { type TButtonVariants } from "./button.types";

export const getBackgroundVariantColor = (variant: TButtonVariants): string => {
    const colors: Record<TButtonVariants, string> = {
        primary: defaultTheme.colors.orange.default,
        secondary: "transparent",
        tertiary: "transparent",
    };

    return colors[variant];
};

export const getTextVariantColor = (variant: TButtonVariants): TColors => {
    const colors: Record<TButtonVariants, TColors> = {
        primary: "neutrals-inverted",
        secondary: "neutrals-default",
        tertiary: "orange-default",
    };

    return colors[variant];
};
