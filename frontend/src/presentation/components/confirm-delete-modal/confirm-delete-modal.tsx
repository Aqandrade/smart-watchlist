import { Trash } from "@phosphor-icons/react";
import { Text } from "../text/text";
import {
    Container,
    IconWrapper,
    TextBlock,
    Actions,
    DangerButton,
    CancelButton,
} from "./confirm-delete-modal.styles";
import { IConfirmDeleteModal } from "./confirm-delete-modal.types";
import { defaultTheme } from "../../themes/themes";

export const ConfirmDeleteModal: React.FC<IConfirmDeleteModal> = ({
    movieName,
    onConfirm,
    onCancel,
}) => {
    return (
        <Container>
            <IconWrapper>
                <Trash
                    color={defaultTheme.colors.red.default}
                    weight="bold"
                    size={28}
                />
            </IconWrapper>

            <TextBlock>
                <Text size="18" weight="600">
                    Remover da watchlist
                </Text>
                <Text size="14" weight="400" color="neutrals-weakness">
                    Tem certeza que deseja remover{" "}
                    <Text size="14" weight="600">
                        {movieName}
                    </Text>{" "}
                    da sua watchlist? Esta ação não pode ser desfeita.
                </Text>
            </TextBlock>

            <Actions>
                <CancelButton onClick={onCancel}>
                    <Text size="16" weight="500" color="neutrals-default">
                        Cancelar
                    </Text>
                </CancelButton>

                <DangerButton onClick={onConfirm}>
                    <Text size="16" weight="500" color="white-default">
                        Remover
                    </Text>
                </DangerButton>
            </Actions>
        </Container>
    );
};
