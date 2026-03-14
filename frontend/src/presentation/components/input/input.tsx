import { CustomInput, InputWrapper } from "./input.styles";
import { type IInput } from "./input.types";

export const Input: React.FC<IInput> = ({ variant = "default", ...rest }) => {
    return (
        <InputWrapper variant={variant}>
            <CustomInput {...rest} />
        </InputWrapper>
    );
};
