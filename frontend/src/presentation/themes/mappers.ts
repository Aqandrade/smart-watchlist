import { type TColors } from "./mappers.types";
import { defaultTheme } from "./themes";

export const getColor = (color: TColors): string => {
    const colors: Record<TColors, string> = {
        "neutrals-inverted": defaultTheme.colors.neutrals.inverted,
        "neutrals-weak": defaultTheme.colors.neutrals.weak,
        "neutrals-weakness": defaultTheme.colors.neutrals.weakness,
        "neutrals-default": defaultTheme.colors.neutrals.default,
        "orange-default": defaultTheme.colors.orange.default,
        "red-default": defaultTheme.colors.red.default,
        "white-default": defaultTheme.colors.white.default,
        "purple-default": defaultTheme.colors.purple.default,
        "green-default": defaultTheme.colors.green.default,
        "yellow-default": defaultTheme.colors.yellow.default,
    };

    return colors[color];
};
