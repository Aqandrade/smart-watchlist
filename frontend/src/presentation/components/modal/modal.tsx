import { X } from "@phosphor-icons/react";
import { Overlay, Content, CloseButton } from "./modal.styles";
import { IModal } from "./modal.types";
import { defaultTheme } from "../../themes/themes";

export const Modal: React.FC<IModal> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <Overlay onClick={handleOverlayClick}>
            <Content>
                <CloseButton onClick={onClose}>
                    <X
                        color={defaultTheme.colors.neutrals.default}
                        weight="bold"
                        size={16}
                    />
                </CloseButton>
                {children}
            </Content>
        </Overlay>
    );
};