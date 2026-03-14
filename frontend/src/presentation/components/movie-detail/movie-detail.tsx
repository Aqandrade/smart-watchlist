import {
    FilmSlate,
    Clock,
    Star,
    CalendarBlank,
} from "@phosphor-icons/react";
import { Text } from "../text/text";
import {
    Container,
    Header,
    TitleRow,
    Description,
    MetaRow,
    MetaItem,
    Divider,
    Providers,
    ProviderBadge,
    StatusBadge,
} from "./movie-detail.styles";
import { IMovieDetail } from "./movie-detail.types";
import {
    getStatusColor,
    getStatusLabel,
} from "../watchlist-card/mappers";
import { defaultTheme } from "../../themes/themes";

export const MovieDetail: React.FC<IMovieDetail> = ({
    movieName,
    movieDescription,
    movieDirector,
    movieReleaseDate,
    movieDuration,
    externalSourceRating,
    status,
    providers,
    createdAt,
}) => {
    const formattedDate = new Date(createdAt).toLocaleDateString("pt-BR");

    return (
        <Container>
            <Header>
                <TitleRow>
                    <FilmSlate
                        color={defaultTheme.colors.neutrals.default}
                        weight="thin"
                        size={32}
                    />
                    <Text size="22" weight="600">
                        {movieName}
                    </Text>
                </TitleRow>
                <StatusBadge>
                    <Text size="12" weight="500" color={getStatusColor(status)}>
                        {getStatusLabel(status)}
                    </Text>
                </StatusBadge>
            </Header>

            <MetaRow>
                <MetaItem>
                    <Star
                        color={defaultTheme.colors.yellow.default}
                        weight="fill"
                        size={18}
                    />
                    <Text size="14" weight="600" color="yellow-default">
                        {externalSourceRating.toFixed(1)}
                    </Text>
                </MetaItem>

                <MetaItem>
                    <CalendarBlank
                        color={defaultTheme.colors.neutrals.weak}
                        weight="thin"
                        size={18}
                    />
                    <Text size="14" weight="400" color="neutrals-weak">
                        {movieReleaseDate}
                    </Text>
                </MetaItem>

                <MetaItem>
                    <Clock
                        color={defaultTheme.colors.neutrals.weak}
                        weight="thin"
                        size={18}
                    />
                    <Text size="14" weight="400" color="neutrals-weak">
                        {movieDuration} min
                    </Text>
                </MetaItem>
            </MetaRow>

            <Text size="12" weight="400" color="neutrals-weak">
                Diretor: {movieDirector}
            </Text>

            <Divider />

            <Text size="14" weight="500">
                Sinopse
            </Text>
            <Description>
                <Text size="14" weight="400" color="neutrals-weakness">
                    {movieDescription}
                </Text>
            </Description>

            <Divider />

            <Text size="14" weight="500">
                Disponível em
            </Text>
            <Providers>
                {providers.map((provider) => (
                    <ProviderBadge key={provider}>
                        <Text size="10" weight="500" color="white-default">
                            {provider}
                        </Text>
                    </ProviderBadge>
                ))}
            </Providers>

            <Text size="10" weight="400" color="neutrals-weak">
                Adicionado em {formattedDate}
            </Text>
        </Container>
    );
};