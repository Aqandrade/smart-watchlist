import { makeLoginPage, makeRegisterPage, makeWatchlistPage } from "../factories/pages";
import { PrivateRoute } from "./private-route";

export const applicationRoutes = [
    {
        element: (
            <PrivateRoute>{makeWatchlistPage()}</PrivateRoute>
        ),
        path: "/",
        key: "/watchlist",
    },
    {
        element: makeLoginPage(),
        path: "/login",
        key: "/login",
    },
    {
        element: makeRegisterPage(),
        path: "/register",
        key: "/register",
    },
];
