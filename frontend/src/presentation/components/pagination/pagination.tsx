import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Container, PageButton, ArrowButton } from "./pagination.styles";
import { IPagination } from "./pagination.types";
import { defaultTheme } from "../../themes/themes";

export const Pagination: React.FC<IPagination> = ({
    currentPage,
    totalItems,
    pageSize,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <Container>
            <ArrowButton
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <CaretLeft
                    color={defaultTheme.colors.neutrals.default}
                    weight="bold"
                    size={16}
                />
            </ArrowButton>

            {pages.map((page) => (
                <PageButton
                    key={page}
                    isActive={page === currentPage}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </PageButton>
            ))}

            <ArrowButton
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <CaretRight
                    color={defaultTheme.colors.neutrals.default}
                    weight="bold"
                    size={16}
                />
            </ArrowButton>
        </Container>
    );
};