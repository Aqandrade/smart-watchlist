import { FilmSlate, Star, CalendarBlank } from "@phosphor-icons/react";
import { Text } from "../text/text";
import {
    Card,
    MovieInfo,
    MovieHeader,
    RatingWrapper,
} from "./search-result-card.styles";
import { ISearchResultCard } from "./search-result-card.types";
import { defaultTheme } from "../../themes/themes";

export const SearchResultCard: React.FC<ISearchResultCard> = ({
    title,
    overview,
    releaseDate,
    voteAverage,
    onClick,
}) => {
    const releaseYear = releaseDate ? releaseDate.substring(0, 4) : "—";

    return (
        <Card onClick={onClick}>
            <MovieInfo>
                <MovieHeader>
                    <FilmSlate
                        color={defaultTheme.colors.neutrals.default}
                        weight="thin"
                        size={24}
                    />
                    <Text size="16" weight="600">
                        {title}
                    </Text>
                    <Text size="12" weight="400" color="neutrals-weak">
                        <CalendarBlank
                            color={defaultTheme.colors.neutrals.weak}
                            weight="thin"
                            size={14}
                        />{" "}
                        {releaseYear}
                    </Text>
                </MovieHeader>

                <Text size="12" weight="400" color="neutrals-weakness">
                    {overview.length > 120
                        ? `${overview.substring(0, 120)}...`
                        : overview}
                </Text>
            </MovieInfo>

            <RatingWrapper>
                <Star
                    color={defaultTheme.colors.yellow.default}
                    weight="fill"
                    size={18}
                />
                <Text size="14" weight="600" color="yellow-default">
                    {voteAverage.toFixed(1)}
                </Text>
            </RatingWrapper>
        </Card>
    );
};
