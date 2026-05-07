import { useEffect, useState, useCallback } from "react";
import { Plus, Power, Prohibit } from "@phosphor-icons/react";
import { Text } from "../text/text";
import { Button } from "../button/button";
import { Loading } from "../loading/loading";
import { SubscriptionModel } from "../../../domain/models";
import { defaultTheme } from "../../themes/themes";
import {
    Container,
    Header,
    FilterRow,
    FilterButton,
    SubscriptionList,
    SubscriptionItem,
    SubscriptionInfo,
    StatusBadge,
    ToggleButton,
    AddForm,
    SelectWrapper,
    CustomSelect,
    ErrorMessage,
    ButtonsRow,
    EmptyState,
    AddButton,
} from "./subscription-management.styles";
import { ISubscriptionManagement } from "./subscription-management.types";

type FilterType = "all" | "active" | "inactive";

const PROVIDERS = [
    "Netflix",
    "Amazon Prime Video",
    "Disney Plus",
    "HBO Max",
    "Paramount Plus",
    "Apple TV Plus",
    "Globoplay",
    "Star Plus",
    "Crunchyroll",
    "Mubi",
];

export const SubscriptionManagement: React.FC<ISubscriptionManagement> = ({
    remoteListSubscriptions,
    remoteAddSubscription,
    remoteUpdateSubscriptionStatus,
}) => {
    const [subscriptions, setSubscriptions] = useState<SubscriptionModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<FilterType>("all");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState("");
    const [addError, setAddError] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [togglingId, setTogglingId] = useState<string | null>(null);
    const [listError, setListError] = useState<string | null>(null);

    const loadSubscriptions = useCallback(
        async (activeFilter?: boolean) => {
            setIsLoading(true);
            setListError(null);

            try {
                const response = await remoteListSubscriptions.list(
                    activeFilter !== undefined ? { active: activeFilter } : undefined
                );
                setSubscriptions(response.items ?? []);
            } catch {
                setListError("Erro ao carregar assinaturas");
            } finally {
                setIsLoading(false);
            }
        },
        [remoteListSubscriptions]
    );

    const handleFilterChange = (newFilter: FilterType) => {
        setFilter(newFilter);

        if (newFilter === "all") loadSubscriptions();
        else if (newFilter === "active") loadSubscriptions(true);
        else loadSubscriptions(false);
    };

    const handleAdd = async () => {
        setAddError(null);

        if (!selectedProvider) {
            setAddError("Selecione um provedor");
            return;
        }

        setIsAdding(true);

        try {
            await remoteAddSubscription.add({ provider_name: selectedProvider });
            setIsAddOpen(false);
            setSelectedProvider("");

            if (filter === "all") loadSubscriptions();
            else if (filter === "active") loadSubscriptions(true);
            else loadSubscriptions(false);
        } catch (err) {
            setAddError(
                err instanceof Error ? err.message : "Erro ao adicionar assinatura"
            );
        } finally {
            setIsAdding(false);
        }
    };

    const handleToggleStatus = async (entityId: string, currentActive: boolean) => {
        setTogglingId(entityId);

        try {
            await remoteUpdateSubscriptionStatus.update({
                entity_id: entityId,
                active: !currentActive,
            });

            if (filter === "all") loadSubscriptions();
            else if (filter === "active") loadSubscriptions(true);
            else loadSubscriptions(false);
        } catch {
            // silently refresh to avoid stale state
        } finally {
            setTogglingId(null);
        }
    };

    const handleCancelAdd = () => {
        setIsAddOpen(false);
        setSelectedProvider("");
        setAddError(null);
    };

    useEffect(() => {
        loadSubscriptions();
    }, [loadSubscriptions]);

    return (
        <Container>
            <Header>
                <Text size="20" weight="600">
                    Assinaturas de Streaming
                </Text>
                <Text size="14" weight="400" color="neutrals-weakness">
                    Gerencie seus serviços de streaming ativos
                </Text>
            </Header>

            <FilterRow>
                <FilterButton
                    $active={filter === "all"}
                    onClick={() => handleFilterChange("all")}
                >
                    <Text
                        size="12"
                        weight="500"
                        color={filter === "all" ? "white-default" : "neutrals-default"}
                    >
                        Todos
                    </Text>
                </FilterButton>
                <FilterButton
                    $active={filter === "active"}
                    onClick={() => handleFilterChange("active")}
                >
                    <Text
                        size="12"
                        weight="500"
                        color={filter === "active" ? "white-default" : "neutrals-default"}
                    >
                        Ativos
                    </Text>
                </FilterButton>
                <FilterButton
                    $active={filter === "inactive"}
                    onClick={() => handleFilterChange("inactive")}
                >
                    <Text
                        size="12"
                        weight="500"
                        color={filter === "inactive" ? "white-default" : "neutrals-default"}
                    >
                        Inativos
                    </Text>
                </FilterButton>

                {!isAddOpen && (
                    <AddButton onClick={() => setIsAddOpen(true)}>
                        <Plus
                            size={14}
                            weight="bold"
                            color={defaultTheme.colors.purple.default}
                        />
                        <Text size="12" weight="600" color="purple-default">
                            Adicionar
                        </Text>
                    </AddButton>
                )}
            </FilterRow>

            {isAddOpen && (
                <AddForm>
                    <Text size="16" weight="600">
                        Nova assinatura
                    </Text>

                    <SelectWrapper>
                        <Text size="12" weight="500" color="neutrals-weakness">
                            Provedor
                        </Text>
                        <CustomSelect
                            value={selectedProvider}
                            onChange={(e) => {
                                setSelectedProvider(e.target.value);
                                setAddError(null);
                            }}
                        >
                            <option value="">Selecione um provedor</option>
                            {PROVIDERS.map((provider) => (
                                <option key={provider} value={provider}>
                                    {provider}
                                </option>
                            ))}
                        </CustomSelect>
                        {addError && (
                            <ErrorMessage>
                                <Text size="12" weight="500" color="red-default">
                                    {addError}
                                </Text>
                            </ErrorMessage>
                        )}
                    </SelectWrapper>

                    <ButtonsRow>
                        <Button variant="secondary" onClick={handleCancelAdd}>
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleAdd}
                            disabled={isAdding}
                        >
                            {isAdding ? "Adicionando..." : "Adicionar"}
                        </Button>
                    </ButtonsRow>
                </AddForm>
            )}

            {isLoading ? (
                <EmptyState>
                    <Loading withLabel label="Carregando assinaturas..." />
                </EmptyState>
            ) : listError ? (
                <EmptyState>
                    <Text size="14" weight="500" color="red-default">
                        {listError}
                    </Text>
                </EmptyState>
            ) : subscriptions.length === 0 ? (
                <EmptyState>
                    <Text size="14" weight="500" color="neutrals-weakness">
                        Nenhuma assinatura encontrada
                    </Text>
                </EmptyState>
            ) : (
                <SubscriptionList>
                    {subscriptions.map((sub) => (
                        <SubscriptionItem key={sub.entity_id}>
                            <SubscriptionInfo>
                                <Text size="14" weight="600">
                                    {sub.provider_name}
                                </Text>
                                <StatusBadge $active={sub.active}>
                                    {sub.active ? "Ativo" : "Inativo"}
                                </StatusBadge>
                            </SubscriptionInfo>

                            <ToggleButton
                                $active={sub.active}
                                onClick={() =>
                                    handleToggleStatus(sub.entity_id, sub.active)
                                }
                                disabled={togglingId === sub.entity_id}
                            >
                                {sub.active ? (
                                    <Prohibit
                                        size={16}
                                        weight="bold"
                                        color={defaultTheme.colors.red.default}
                                    />
                                ) : (
                                    <Power
                                        size={16}
                                        weight="bold"
                                        color={defaultTheme.colors.green.default}
                                    />
                                )}
                                <Text
                                    size="12"
                                    weight="500"
                                    color={sub.active ? "red-default" : "green-default"}
                                >
                                    {togglingId === sub.entity_id
                                        ? "..."
                                        : sub.active
                                        ? "Desativar"
                                        : "Ativar"}
                                </Text>
                            </ToggleButton>
                        </SubscriptionItem>
                    ))}
                </SubscriptionList>
            )}
        </Container>
    );
};
