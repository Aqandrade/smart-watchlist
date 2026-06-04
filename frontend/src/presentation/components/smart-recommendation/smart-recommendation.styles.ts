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

export const SubscriptionList = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(6)}rem;

    max-height: ${formatPxToRem(160)}rem;
    overflow-y: auto;
`;

export const SubscriptionItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: ${formatPxToRem(10)}rem ${formatPxToRem(14)}rem;

    border-radius: ${formatPxToRem(10)}rem;

    background-color: ${({ theme }) => theme.colors.neutrals.inverted};

    border: ${formatPxToRem(1)}rem solid ${({ theme }) => theme.colors.neutrals.weak}44;
`;

export const DurationSection = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(8)}rem;
`;

export const DurationInput = styled.input`
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

    &:focus {
        border-color: ${({ theme }) => theme.colors.purple.default};
    }

    &::placeholder {
        color: ${({ theme }) => theme.colors.neutrals.weakness};
    }

    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
        opacity: 1;
    }
`;

export const ButtonsRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    gap: ${formatPxToRem(12)}rem;
`;

export const ErrorMessage = styled.div`
    display: flex;
    align-items: center;

    padding: ${formatPxToRem(12)}rem ${formatPxToRem(16)}rem;

    border-radius: ${formatPxToRem(8)}rem;

    background-color: ${({ theme }) => theme.colors.red.default}11;
    border: ${formatPxToRem(1)}rem solid ${({ theme }) => theme.colors.red.default}44;
`;

export const ResultCard = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(16)}rem;

    padding: ${formatPxToRem(16)}rem;

    border-radius: ${formatPxToRem(12)}rem;

    background-color: ${({ theme }) => theme.colors.neutrals.inverted};

    border: ${formatPxToRem(1)}rem solid ${({ theme }) => theme.colors.purple.default}44;
`;

export const ResultHeader = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(10)}rem;
`;

export const MetaRow = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(16)}rem;

    flex-wrap: wrap;
`;

export const MetaItem = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(4)}rem;
`;

export const Divider = styled.hr`
    border: none;
    border-top: ${formatPxToRem(1)}rem solid
        ${({ theme }) => theme.colors.neutrals.weak};
`;

export const Providers = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(8)}rem;

    flex-wrap: wrap;
`;

export const ProviderBadge = styled.span`
    display: flex;
    align-items: center;

    padding: ${formatPxToRem(4)}rem ${formatPxToRem(12)}rem;

    border-radius: ${formatPxToRem(16)}rem;

    background-color: ${({ theme }) => theme.colors.purple.default};
`;

export const EmptyState = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: ${formatPxToRem(20)}rem 0;
`;
