export interface IButtonDefaultProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export type TButtonVariants = "primary" | "secondary" | "tertiary";

export interface IButton extends IButtonDefaultProps {
    variant?: TButtonVariants;
}

export interface ICustomButton {
    variant: TButtonVariants;
}
