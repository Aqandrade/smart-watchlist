import { makeWatchlistPage } from "../factories/pages";

export const applicationRoutes = [
    {
        element: makeWatchlistPage(),
        path: "/",
        key: "/watchlist",
    },
];