import { useState } from "react";

import { Text } from "../text/text";
import { Input } from "../input";
import { Button } from "../button/button";
import {
    FormContainer,
    FormField,
    ErrorMessage,
    ButtonsRow,
} from "./add-movie-form.styles";
import { IAddMovieForm } from "./add-movie-form.types";

export const AddMovieForm: React.FC<IAddMovieForm> = ({
    onSubmit,
    onCancel,
}) => {
    const [movieName, setMovieName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setError(null);

        if (!movieName.trim()) {
            setError("O nome do filme é obrigatório");
            return;
        }

        setIsLoading(true);

        try {
            await onSubmit(movieName.trim());
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Erro ao adicionar filme"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer>
            <Text size="20" weight="600">
                Adicionar Filme
            </Text>

            <FormField>
                <Text size="14" weight="500" color="neutrals-weakness">
                    Nome do filme
                </Text>
                <Input
                    placeholder="Ex: The Shawshank Redemption"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                    variant={error ? "error" : "default"}
                    disabled={isLoading}
                />
                {error && (
                    <ErrorMessage>
                        <Text size="12" weight="500" color="red-default">
                            {error}
                        </Text>
                    </ErrorMessage>
                )}
            </FormField>

            <ButtonsRow>
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? "Adicionando..." : "Adicionar"}
                </Button>
            </ButtonsRow>
        </FormContainer>
    );
};
