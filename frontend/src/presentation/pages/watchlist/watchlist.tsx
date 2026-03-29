import { useEffect, useState, useCallback } from "react";
import { Plus } from "@phosphor-icons/react";
import { Text } from "../../components/text/text";
import { Loading } from "../../components/loading/loading";
import { WatchlistCard } from "../../components/watchlist-card/watchlist-card";
import { Pagination } from "../../components/pagination/pagination";
import { Modal } from "../../components/modal/modal";
import { MovieDetail } from "../../components/movie-detail/movie-detail";
import { AddMovieForm } from "../../components/add-movie-form";
import { ConfirmDeleteModal } from "../../components/confirm-delete-modal/confirm-delete-modal";
import { WatchlistStatus } from "../../components/watchlist-card/watchlist-card.types";
import {
    Container,
    CustomText,
    Header,
    ListHeader,
    LoadingWrapper,
    Main,
    Movies,
    Welcome,
    EmptyState,
    AddButton,
} from "./watchlist.styles";
import { IWatchlist } from "./watchlist.types";
import { PageState } from "../../common/types";
import { WatchlistItemModel } from "../../../domain/models";
import { defaultTheme } from "../../themes/themes";

export const Watchlist: React.FC<IWatchlist> = ({
    remoteListWatchlist,
    remoteAddMovieToWatchlist,
    remoteSearchMovies,
    remoteUpdateWatchlistItemStatus,
    remoteDeleteWatchlistItem,
}) => {
    const [pageState, setPageState] = useState<PageState>("loading");
    const [items, setItems] = useState<WatchlistItemModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [selectedMovie, setSelectedMovie] = useState<WatchlistItemModel | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState<WatchlistItemModel | null>(null);

    const loadWatchlist = useCallback(
        async (page: number) => {
            setPageState("loading");

            try {
                const response = await remoteListWatchlist.list({
                    page,
                    page_size: pageSize,
                });

                setItems(response.items ?? []);
                setTotalItems(response.total_items);
                setPageSize(response.page_size);
                setCurrentPage(response.page);

                setPageState(
                    response.items && response.items.length > 0
                        ? "ready"
                        : "empty"
                );
            } catch {
                setPageState("error");
            }
        },
        [remoteListWatchlist, pageSize]
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        loadWatchlist(page);
    };

    const handleAddMovie = async (movieName: string) => {
        await remoteAddMovieToWatchlist.add({ movie_name: movieName });
        setIsAddModalOpen(false);
        loadWatchlist(1);
    };

    const handleStatusChange = async (entityId: string, currentStatus: WatchlistStatus) => {
        const newStatus = currentStatus === "WATCHED" ? "PENDING" : "WATCHED";
        await remoteUpdateWatchlistItemStatus.update({ entity_id: entityId, status: newStatus });
        loadWatchlist(currentPage);
    };

    const handleConfirmDelete = async () => {
        if (!movieToDelete) return;
        await remoteDeleteWatchlistItem.delete({ entity_id: movieToDelete.entity_id });
        setMovieToDelete(null);
        loadWatchlist(currentPage);
    };

    const renderContent = () => {
        if (pageState === "loading") {
            return (
                <LoadingWrapper>
                    <Loading withLabel />
                </LoadingWrapper>
            );
        }

        if (pageState === "error") {
            return (
                <EmptyState>
                    <Text size="16" weight="500" color="red-default">
                        Erro ao carregar a watchlist
                    </Text>
                </EmptyState>
            );
        }

        if (pageState === "empty") {
            return (
                <EmptyState>
                    <Text size="16" weight="500" color="neutrals-weakness">
                        Nenhum filme na watchlist
                    </Text>
                </EmptyState>
            );
        }

        return (
            <>
                <Movies>
                    {items.map((item) => (
                        <WatchlistCard
                            key={item.entity_id}
                            movieName={item.movie_name}
                            movieDescription={item.movie_description}
                            movieDirector={item.movie_director}
                            movieReleaseDate={item.movie_release_date}
                            movieDuration={item.movie_duration}
                            externalSourceRating={item.external_source_rating}
                            status={item.status as WatchlistStatus}
                            providers={item.providers}
                            createdAt={item.created_at}
                            onClick={() => setSelectedMovie(item)}
                            onStatusChange={() => handleStatusChange(item.entity_id, item.status as WatchlistStatus)}
                            onDelete={() => setMovieToDelete(item)}
                        />
                    ))}
                </Movies>
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />
            </>
        );
    };

    useEffect(() => {
        loadWatchlist(1);
    }, [loadWatchlist]);

    return (
        <Container>
            <Header>
                <Welcome>
                    <CustomText size="32" weight="500" color="white-default">
                        Smart Watchlist
                    </CustomText>
                </Welcome>
            </Header>
            <Main>
                <ListHeader>
                    <Text size="18" weight="500">
                        Meus Filmes
                    </Text>
                    <AddButton onClick={() => setIsAddModalOpen(true)}>
                        <Plus
                            size={18}
                            weight="bold"
                            color={defaultTheme.colors.purple.default}
                        />
                        <Text size="14" weight="600" color="purple-default">
                            Adicionar Filme
                        </Text>
                    </AddButton>
                </ListHeader>
                {renderContent()}
            </Main>

            <Modal
                isOpen={!!selectedMovie}
                onClose={() => setSelectedMovie(null)}
            >
                {selectedMovie && (
                    <MovieDetail
                        movieName={selectedMovie.movie_name}
                        movieDescription={selectedMovie.movie_description}
                        movieDirector={selectedMovie.movie_director}
                        movieReleaseDate={selectedMovie.movie_release_date}
                        movieDuration={selectedMovie.movie_duration}
                        externalSourceRating={selectedMovie.external_source_rating}
                        status={selectedMovie.status as WatchlistStatus}
                        providers={selectedMovie.providers}
                        createdAt={selectedMovie.created_at}
                    />
                )}
            </Modal>

            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            >
                <AddMovieForm
                    onSubmit={handleAddMovie}
                    onCancel={() => setIsAddModalOpen(false)}
                    remoteSearchMovies={remoteSearchMovies}
                />
            </Modal>

            <Modal
                isOpen={!!movieToDelete}
                onClose={() => setMovieToDelete(null)}
            >
                {movieToDelete && (
                    <ConfirmDeleteModal
                        movieName={movieToDelete.movie_name}
                        onConfirm={handleConfirmDelete}
                        onCancel={() => setMovieToDelete(null)}
                    />
                )}
            </Modal>
        </Container>
    );
};
