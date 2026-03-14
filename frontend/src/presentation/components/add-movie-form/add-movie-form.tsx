import { useState } from "react";

import { Text } from "../text/text";
import { Input } from "../input";
import { Button } from "../button/button";
import { Loading } from "../loading/loading";
import { SearchResultCard } from "../search-result-card";
import {
    FormContainer,
    FormField,
    ErrorMessage,
    ButtonsRow,
    ResultsList,
    EmptyResults,
} from "./add-movie-form.styles";
import { IAddMovieForm } from "./add-movie-form.types";
import { MovieSearchResultModel } from "../../../domain/models";

type FormStep = "searching" | "selecting";

export const AddMovieForm: React.FC<IAddMovieForm> = ({
    onSubmit,
    onCancel,
    remoteSearchMovies,
}) => {
    const [step, setStep] = useState<FormStep>("searching");
    const [movieName, setMovieName] = useState("");
    const [results, setResults] = useState<MovieSearchResultModel[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        setError(null);

        if (!movieName.trim()) {
            setError("O nome do filme é obrigatório");
            return;
        }

        setIsLoading(true);

        try {
            const searchResults = await remoteSearchMovies.search({
                query: movieName.trim(),
            });

            setResults(searchResults);
            setStep("selecting");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Erro ao buscar filmes"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelect = async (title: string) => {
        setError(null);
        setIsLoading(true);

        try {
            await onSubmit(title);
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

    const handleBack = () => {
        setStep("searching");
        setResults([]);
        setError(null);
    };

    if (isLoading) {
        return (
            <FormContainer>
                <Loading
                    withLabel
                    label={
                        step === "searching"
                            ? "Buscando filmes..."
                            : "Adicionando filme..."
                    }
                />
            </FormContainer>
        );
    }

    if (step === "selecting") {
        return (
            <FormContainer>
                <Text size="20" weight="600">
                    Selecionar Filme
                </Text>

                <Text size="14" weight="400" color="neutrals-weakness">
                    Resultados para "{movieName}"
                </Text>

                {error && (
                    <ErrorMessage>
                        <Text size="12" weight="500" color="red-default">
                            {error}
                        </Text>
                    </ErrorMessage>
                )}

                {results.length === 0 ? (
                    <EmptyResults>
                        <Text size="14" weight="500" color="neutrals-weakness">
                            Nenhum filme encontrado
                        </Text>
                    </EmptyResults>
                ) : (
                    <ResultsList>
                        {results.map((result) => (
                            <SearchResultCard
                                key={result.external_id}
                                title={result.title}
                                overview={result.overview}
                                releaseDate={result.release_date}
                                voteAverage={result.vote_average}
                                onClick={() => handleSelect(result.title)}
                            />
                        ))}
                    </ResultsList>
                )}

                <ButtonsRow>
                    <Button
                        variant="secondary"
                        onClick={handleBack}
                    >
                        Voltar
                    </Button>
                </ButtonsRow>
            </FormContainer>
        );
    }

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
                >
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSearch}
                >
                    Buscar
                </Button>
            </ButtonsRow>
        </FormContainer>
    );
};
