import { useEffect, useState, useCallback } from "react";
import { Sparkle, FilmSlate, Clock, Star, MonitorPlay } from "@phosphor-icons/react";
import { Text } from "../text/text";
import { Button } from "../button/button";
import { Loading } from "../loading/loading";
import { Modal } from "../modal/modal";
import { SubscriptionModel } from "../../../domain/models";
import { RecommendationModel } from "../../../domain/models";
import { defaultTheme } from "../../themes/themes";
import {
    Container,
    Header,
    SubscriptionList,
    SubscriptionItem,
    DurationSection,
    DurationInput,
    ButtonsRow,
    ErrorMessage,
    ResultCard,
    ResultHeader,
    MetaRow,
    MetaItem,
    Divider,
    Providers,
    ProviderBadge,
    EmptyState,
} from "./smart-recommendation.styles";
import { ISmartRecommendation } from "./smart-recommendation.types";

type InternalState = "input" | "loading" | "result" | "error";

const ERROR_MESSAGES: Record<string, string> = {
    "no movies in watchlist":
        "Você não possui filmes na watchlist. Adicione filmes para usar a recomendação inteligente.",
    "no active subscriptions":
        "Você não possui assinaturas ativas. Ative uma assinatura para usar a recomendação inteligente.",
    "no movies matching active subscriptions":
        "Nenhum filme da sua watchlist está disponível nas suas assinaturas ativas.",
    "no movies matching duration criteria":
        "Nenhum filme se encaixa no tempo disponível. Tente aumentar a duração ou adicionar mais filmes.",
};

function mapErrorMessage(raw: string): string {
    const key = Object.keys(ERROR_MESSAGES).find((k) =>
        raw.toLowerCase().includes(k)
    );
    return key ? ERROR_MESSAGES[key] : "Ocorreu um erro ao buscar a recomendação. Tente novamente.";
}

export const SmartRecommendation: React.FC<ISmartRecommendation> = ({
    isOpen,
    onClose,
    remoteListSubscriptions,
    remoteGetRecommendation,
}) => {
    const [internalState, setInternalState] = useState<InternalState>("input");
    const [subscriptions, setSubscriptions] = useState<SubscriptionModel[]>([]);
    const [isLoadingSubs, setIsLoadingSubs] = useState(true);
    const [durationInput, setDurationInput] = useState("");
    const [recommendation, setRecommendation] = useState<RecommendationModel | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const loadActiveSubscriptions = useCallback(async () => {
        setIsLoadingSubs(true);
        try {
            const response = await remoteListSubscriptions.list({ active: true });
            setSubscriptions(response.items ?? []);
        } catch {
            setSubscriptions([]);
        } finally {
            setIsLoadingSubs(false);
        }
    }, [remoteListSubscriptions]);

    useEffect(() => {
        if (isOpen) {
            setInternalState("input");
            setDurationInput("");
            setRecommendation(null);
            setErrorMessage("");
            loadActiveSubscriptions();
        }
    }, [isOpen, loadActiveSubscriptions]);

    const handleRecommend = async () => {
        setInternalState("loading");

        const params =
            durationInput.trim() !== ""
                ? { max_duration: parseInt(durationInput, 10) }
                : undefined;

        try {
            const result = await remoteGetRecommendation.get(params);
            setRecommendation(result);
            setInternalState("result");
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Erro desconhecido";
            setErrorMessage(mapErrorMessage(message));
            setInternalState("error");
        }
    };

    const handleTryAgain = () => {
        setInternalState("input");
        setDurationInput("");
        setErrorMessage("");
        setRecommendation(null);
    };

    const renderContent = () => {
        if (internalState === "loading") {
            return (
                <EmptyState>
                    <Loading withLabel label="Buscando recomendação..." />
                </EmptyState>
            );
        }

        if (internalState === "error") {
            return (
                <>
                    <ErrorMessage>
                        <Text size="14" weight="500" color="red-default">
                            {errorMessage}
                        </Text>
                    </ErrorMessage>
                    <ButtonsRow>
                        <Button variant="secondary" onClick={handleTryAgain}>
                            Tentar novamente
                        </Button>
                        <Button variant="primary" onClick={onClose}>
                            Fechar
                        </Button>
                    </ButtonsRow>
                </>
            );
        }

        if (internalState === "result" && recommendation) {
            return (
                <>
                    <Text size="14" weight="500" color="neutrals-weakness">
                        Com base nos seus filmes e assinaturas ativas, recomendamos:
                    </Text>

                    <ResultCard>
                        <ResultHeader>
                            <FilmSlate
                                color={defaultTheme.colors.purple.default}
                                weight="thin"
                                size={28}
                            />
                            <Text size="20" weight="600">
                                {recommendation.movie_name}
                            </Text>
                        </ResultHeader>

                        <MetaRow>
                            <MetaItem>
                                <Star
                                    color={defaultTheme.colors.yellow.default}
                                    weight="fill"
                                    size={16}
                                />
                                <Text size="12" weight="600" color="yellow-default">
                                    {recommendation.external_source_rating.toFixed(1)}
                                </Text>
                            </MetaItem>

                            <MetaItem>
                                <Clock
                                    color={defaultTheme.colors.neutrals.weak}
                                    weight="thin"
                                    size={16}
                                />
                                <Text size="12" weight="400" color="neutrals-weak">
                                    {recommendation.movie_duration} min
                                </Text>
                            </MetaItem>
                        </MetaRow>

                        <Text size="12" weight="400" color="neutrals-weak">
                            Diretor: {recommendation.movie_director} · {recommendation.movie_release_date}
                        </Text>

                        <Divider />

                        <Text size="12" weight="400" color="neutrals-weakness">
                            {recommendation.movie_description}
                        </Text>

                        {recommendation.providers && recommendation.providers.length > 0 && (
                            <>
                                <Divider />
                                <Text size="12" weight="500">
                                    Disponível em
                                </Text>
                                <Providers>
                                    {recommendation.providers.map((provider) => (
                                        <ProviderBadge key={provider}>
                                            <Text size="10" weight="500" color="white-default">
                                                {provider}
                                            </Text>
                                        </ProviderBadge>
                                    ))}
                                </Providers>
                            </>
                        )}
                    </ResultCard>

                    <ButtonsRow>
                        <Button variant="secondary" onClick={handleTryAgain}>
                            Nova recomendação
                        </Button>
                        <Button variant="primary" onClick={onClose}>
                            Fechar
                        </Button>
                    </ButtonsRow>
                </>
            );
        }

        return (
            <>
                <Text size="14" weight="400" color="neutrals-weakness">
                    Assinaturas ativas consideradas:
                </Text>

                {isLoadingSubs ? (
                    <EmptyState>
                        <Loading withLabel label="Carregando assinaturas..." />
                    </EmptyState>
                ) : subscriptions.length === 0 ? (
                    <EmptyState>
                        <Text size="12" weight="400" color="neutrals-weakness">
                            Nenhuma assinatura ativa encontrada
                        </Text>
                    </EmptyState>
                ) : (
                    <SubscriptionList>
                        {subscriptions.map((sub) => (
                            <SubscriptionItem key={sub.entity_id}>
                                <MonitorPlay
                                    size={16}
                                    color={defaultTheme.colors.purple.default}
                                    weight="thin"
                                />
                                <Text size="12" weight="500">
                                    {sub.provider_name}
                                </Text>
                            </SubscriptionItem>
                        ))}
                    </SubscriptionList>
                )}

                <DurationSection>
                    <Text size="14" weight="500">
                        Tempo disponível{" "}
                        <Text size="12" weight="400" color="neutrals-weakness">
                            (opcional)
                        </Text>
                    </Text>
                    <DurationInput
                        type="number"
                        min={1}
                        value={durationInput}
                        onChange={(e) => setDurationInput(e.target.value)}
                        placeholder="Ex: 120 (em minutos)"
                    />
                </DurationSection>

                <ButtonsRow>
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleRecommend}
                        disabled={isLoadingSubs}
                    >
                        <Sparkle size={16} weight="fill" />
                        Recomendar
                    </Button>
                </ButtonsRow>
            </>
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Container>
                <Header>
                    <Text size="20" weight="600">
                        Recomendação Inteligente
                    </Text>
                    <Text size="14" weight="400" color="neutrals-weakness">
                        Encontre o melhor filme para assistir agora
                    </Text>
                </Header>

                {renderContent()}
            </Container>
        </Modal>
    );
};
