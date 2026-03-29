import { FilmSlate, Clock, Star, CalendarBlank, CheckCircle, ArrowCounterClockwise, Trash } from "@phosphor-icons/react";
import { Text } from "../text/text";
import {
    Card,
    MovieInfo,
    MovieHeader,
    MovieMeta,
    MetaItem,
    Providers,
    ProviderBadge,
    StatusBadge,
    RatingWrapper,
    CardRight,
    CardMeta,
    CardActions,
    ActionButton,
} from "./watchlist-card.styles";
import { IWatchlistCard } from "./watchlist-card.types";
import { getStatusColor, getStatusLabel } from "./mappers";
import { defaultTheme } from "../../themes/themes";

export const WatchlistCard: React.FC<IWatchlistCard> = ({
    movieName,
    movieDescription,
    movieDirector,
    movieReleaseDate,
    movieDuration,
    externalSourceRating,
    status,
    providers,
    onClick,
    onStatusChange,
    onDelete,
}) => {
    const handleStatusChange = (e: React.MouseEvent) => {
        e.stopPropagation();
        onStatusChange?.();
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete?.();
    };

    return (
        <Card onClick={onClick}>
            <MovieInfo>
                <MovieHeader>
                    <FilmSlate
                        color={defaultTheme.colors.neutrals.default}
                        weight="thin"
                        size={28}
                    />
                    <Text size="18" weight="600">
                        {movieName}
                    </Text>
                </MovieHeader>

                <Text size="14" weight="400" color="neutrals-weakness">
                    {movieDescription.length > 150
                        ? `${movieDescription.substring(0, 150)}...`
                        : movieDescription}
                </Text>

                <Text size="12" weight="400" color="neutrals-weak">
                    Diretor: {movieDirector}
                </Text>

                <MovieMeta>
                    <MetaItem>
                        <CalendarBlank
                            color={defaultTheme.colors.neutrals.weak}
                            weight="thin"
                            size={16}
                        />
                        <Text size="12" weight="400" color="neutrals-weak">
                            {movieReleaseDate}
                        </Text>
                    </MetaItem>

                    <MetaItem>
                        <Clock
                            color={defaultTheme.colors.neutrals.weak}
                            weight="thin"
                            size={16}
                        />
                        <Text size="12" weight="400" color="neutrals-weak">
                            {movieDuration} min
                        </Text>
                    </MetaItem>
                </MovieMeta>

                {providers && providers.length > 0 && (
                    <Providers>
                        {providers.map((provider) => (
                            <ProviderBadge key={provider}>
                                <Text size="10" weight="500" color="white-default">
                                    {provider}
                                </Text>
                            </ProviderBadge>
                        ))}
                    </Providers>
                )}
            </MovieInfo>

            <CardRight>
                <CardMeta>
                    <RatingWrapper>
                        <Star
                            color={defaultTheme.colors.yellow.default}
                            weight="fill"
                            size={20}
                        />
                        <Text size="14" weight="600" color="yellow-default">
                            {externalSourceRating.toFixed(1)}
                        </Text>
                    </RatingWrapper>

                    <StatusBadge>
                        <Text size="12" weight="500" color={getStatusColor(status)}>
                            {getStatusLabel(status)}
                        </Text>
                    </StatusBadge>
                </CardMeta>

                <CardActions>
                    <ActionButton
                        variant="status"
                        title={status === "WATCHED" ? "Marcar como Pendente" : "Marcar como Assistido"}
                        onClick={handleStatusChange}
                    >
                        {status === "WATCHED" ? (
                            <ArrowCounterClockwise
                                color={defaultTheme.colors.green.default}
                                weight="bold"
                                size={16}
                            />
                        ) : (
                            <CheckCircle
                                color={defaultTheme.colors.green.default}
                                weight="bold"
                                size={16}
                            />
                        )}
                    </ActionButton>

                    <ActionButton
                        variant="delete"
                        title="Remover da watchlist"
                        onClick={handleDelete}
                    >
                        <Trash
                            color={defaultTheme.colors.red.default}
                            weight="bold"
                            size={16}
                        />
                    </ActionButton>
                </CardActions>
            </CardRight>
        </Card>
    );
};
