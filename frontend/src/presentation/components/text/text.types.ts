import { type TColors } from "../../themes/mappers.types";

export interface ISpanDefaultProps
    extends React.HTMLAttributes<HTMLSpanElement> {}

export type TSizes =
    | "8"
    | "10"
    | "12"
    | "14"
    | "16"
    | "18"
    | "20"
    | "22"
    | "24"
    | "32"
    | "48";

export type TWeights = "400" | "500" | "600" | "700";

export type TAligns = "center" | "flex-start" | "flex-end";

export interface IText extends ISpanDefaultProps {
    weight: TWeights;
    color?: TColors;
    size: TSizes;
    align?: TAligns;
}

export interface ICustomText {
    weight: TWeights;
    color: TColors;
    size: TSizes;
    align: TAligns;
}
