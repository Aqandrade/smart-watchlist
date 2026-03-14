import { Text } from "../text/text";
import { Container, Spinner } from "./loading.styles";
import { ILoading } from "./loading.types";

export const Loading: React.FC<ILoading> = ({ withLabel = false }) => {
    return (
        <Container>
            <Spinner />
            {withLabel && (
                <Text size="14" weight="400" color="neutrals-weakness">
                    Carregando...
                </Text>
            )}
        </Container>
    );
};