import { TColors } from "../../themes/mappers.types";
import { WatchlistStatus } from "./watchlist-card.types";

export const getStatusColor = (status: WatchlistStatus): TColors => {
    const colors: Record<WatchlistStatus, TColors> = {
        PENDING: "yellow-default",
        WATCHED: "green-default",
        DROPPED: "red-default",
    };

    return colors[status];
};

export const getStatusLabel = (status: WatchlistStatus): string => {
    const labels: Record<WatchlistStatus, string> = {
        PENDING: "Pendente",
        WATCHED: "Assistido",
        DROPPED: "Descartado",
    };

    return labels[status];
};
