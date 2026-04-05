import { styled } from "styled-components";
import { formatPxToRem } from "../../helpers/format-css-value/format-px-to-rem";
import { Text } from "../../components/text/text";

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    min-height: 100vh;

    min-width: 340px;

    background-color: ${({ theme }) => theme.colors.neutrals.inverted};
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    min-height: 12vh;

    width: 100%;

    padding: ${formatPxToRem(24)}rem ${formatPxToRem(26)}rem;

    background-color: ${({ theme }) => theme.colors.purple.default};
`;

export const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    gap: ${formatPxToRem(6)}rem;

    border: none;
    background: none;

    cursor: pointer;

    color: ${({ theme }) => theme.colors.white.default};

    opacity: 0.85;

    &:hover {
        opacity: 1;
    }
`;

export const Welcome = styled.div`
    display: flex;
    margin-bottom: ${formatPxToRem(16)}rem;
`;

export const CustomText = styled(Text)`
    @media (max-width: 410px) {
        font-size: 24px;
    }
`;

export const Main = styled.div`
    display: flex;
    flex-direction: column;

    align-self: center;

    max-width: ${formatPxToRem(995)}rem;

    width: 100%;

    margin: 0 ${formatPxToRem(120)}rem;
`;

export const ListHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    margin-top: ${formatPxToRem(32)}rem;
    margin-bottom: ${formatPxToRem(16)}rem;
`;

export const Movies = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(8)}rem;

    width: 100%;
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    padding: ${formatPxToRem(60)}rem 0;

    gap: ${formatPxToRem(12)}rem;
`;

export const LoadingWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: ${formatPxToRem(60)}rem 0;
`;

export const AddButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    gap: ${formatPxToRem(8)}rem;

    border: none;
    background: none;

    cursor: pointer;

    color: ${({ theme }) => theme.colors.purple.default};
`;
