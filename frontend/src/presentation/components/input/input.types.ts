interface IInputDefaultProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

export type TInputVariant = "default" | "error" | "success";

export interface IInput extends IInputDefaultProps {
    variant?: TInputVariant;
}

export interface IInputWrapper {
    variant: TInputVariant;
}
