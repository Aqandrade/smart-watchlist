import { defaultTheme } from "../../themes/themes";
import type { TInputVariant } from "./input.types";

export const getInputVariantColor = (variant: TInputVariant): string => {
    const colors: Record<TInputVariant, string> = {
        default: defaultTheme.colors.neutrals.default,
        success: defaultTheme.colors.green.default,
        error: defaultTheme.colors.red.default,
    };

    return colors[variant];
};
