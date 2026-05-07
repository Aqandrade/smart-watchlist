import { styled } from "styled-components";
import { formatPxToRem } from "../../helpers/format-css-value/format-px-to-rem";

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(20)}rem;

    width: 100%;

    padding: ${formatPxToRem(8)}rem 0;

    min-width: ${formatPxToRem(400)}rem;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(4)}rem;
`;

export const FilterRow = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(8)}rem;
`;

export const FilterButton = styled.button<{ $active: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: ${formatPxToRem(6)}rem ${formatPxToRem(16)}rem;

    border-radius: ${formatPxToRem(20)}rem;
    border: ${formatPxToRem(1)}rem solid
        ${({ theme, $active }) =>
            $active ? theme.colors.purple.default : theme.colors.neutrals.weak};

    background-color: ${({ theme, $active }) =>
        $active ? theme.colors.purple.default : "transparent"};

    cursor: pointer;

    transition: all 0.15s ease;

    &:hover {
        opacity: 0.8;
    }
`;

export const SubscriptionList = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(8)}rem;

    max-height: ${formatPxToRem(320)}rem;
    overflow-y: auto;
`;

export const SubscriptionItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: ${formatPxToRem(12)}rem ${formatPxToRem(16)}rem;

    border-radius: ${formatPxToRem(12)}rem;

    background-color: ${({ theme }) => theme.colors.neutrals.inverted};

    border: ${formatPxToRem(1)}rem solid ${({ theme }) => theme.colors.neutrals.weak}44;
`;

export const SubscriptionInfo = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(2)}rem;
`;

export const StatusBadge = styled.span<{ $active: boolean }>`
    display: inline-flex;
    align-items: center;

    padding: ${formatPxToRem(2)}rem ${formatPxToRem(8)}rem;

    border-radius: ${formatPxToRem(20)}rem;

    background-color: ${({ theme, $active }) =>
        $active ? theme.colors.green.default + "22" : theme.colors.red.default + "22"};

    color: ${({ theme, $active }) =>
        $active ? theme.colors.green.default : theme.colors.red.default};

    font-size: ${formatPxToRem(11)}rem;
    font-weight: 600;
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: ${formatPxToRem(8)}rem ${formatPxToRem(14)}rem;

    border-radius: ${formatPxToRem(8)}rem;
    border: ${formatPxToRem(1)}rem solid
        ${({ theme, $active }) =>
            $active ? theme.colors.red.default : theme.colors.green.default};

    background-color: transparent;

    cursor: pointer;

    transition: all 0.15s ease;

    &:hover {
        background-color: ${({ theme, $active }) =>
            $active
                ? theme.colors.red.default + "11"
                : theme.colors.green.default + "11"};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const AddForm = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(12)}rem;

    padding: ${formatPxToRem(16)}rem;

    border-radius: ${formatPxToRem(12)}rem;

    border: ${formatPxToRem(1)}rem solid ${({ theme }) => theme.colors.neutrals.weak}44;

    background-color: ${({ theme }) => theme.colors.neutrals.inverted};
`;

export const SelectWrapper = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(8)}rem;
`;

export const CustomSelect = styled.select`
    width: 100%;

    padding: ${formatPxToRem(12)}rem ${formatPxToRem(14)}rem;

    border-radius: ${formatPxToRem(8)}rem;
    border: ${formatPxToRem(1)}rem solid ${({ theme }) => theme.colors.neutrals.weak};

    background-color: ${({ theme }) => theme.colors.input.background.default};

    font-family: ${({ theme }) => theme.fonts.poppins};
    font-size: ${formatPxToRem(14)}rem;
    font-weight: 400;

    color: ${({ theme }) => theme.colors.neutrals.default};

    outline: none;

    cursor: pointer;

    &:focus {
        border-color: ${({ theme }) => theme.colors.purple.default};
    }
`;

export const ErrorMessage = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(6)}rem;
`;

export const ButtonsRow = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(12)}rem;
`;

export const EmptyState = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: ${formatPxToRem(32)}rem 0;
`;

export const AddButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    gap: ${formatPxToRem(6)}rem;

    border: none;
    background: none;

    cursor: pointer;

    color: ${({ theme }) => theme.colors.purple.default};

    align-self: flex-end;
`;
