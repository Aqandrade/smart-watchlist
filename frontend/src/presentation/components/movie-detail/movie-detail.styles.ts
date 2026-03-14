import { styled } from "styled-components";
import { formatPxToRem } from "../../helpers/format-css-value/format-px-to-rem";

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(16)}rem;

    padding-top: ${formatPxToRem(8)}rem;
    padding-right: ${formatPxToRem(32)}rem;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: ${formatPxToRem(12)}rem;
`;

export const TitleRow = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(12)}rem;
`;

export const Description = styled.div`
    line-height: 1.6;
`;

export const MetaRow = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(20)}rem;
`;

export const MetaItem = styled.div`
    display: flex;
    align-items: center;

    gap: ${formatPxToRem(6)}rem;
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

export const StatusBadge = styled.div`
    display: flex;
    align-items: center;

    padding: ${formatPxToRem(4)}rem ${formatPxToRem(12)}rem;

    border-radius: ${formatPxToRem(16)}rem;

    background-color: ${({ theme }) => theme.colors.input.background.default};
`;
