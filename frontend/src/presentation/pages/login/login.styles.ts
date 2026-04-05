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
    flex-direction: column;

    min-height: 12vh;

    width: 100%;

    padding: ${formatPxToRem(24)}rem ${formatPxToRem(26)}rem;

    background-color: ${({ theme }) => theme.colors.purple.default};
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
    align-items: center;
    justify-content: center;

    flex: 1;

    padding: ${formatPxToRem(40)}rem ${formatPxToRem(16)}rem;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: ${formatPxToRem(440)}rem;

    background-color: ${({ theme }) => theme.colors.white.default};

    border-radius: ${formatPxToRem(12)}rem;

    padding: ${formatPxToRem(40)}rem ${formatPxToRem(32)}rem;

    gap: ${formatPxToRem(24)}rem;

    box-shadow: 0 ${formatPxToRem(2)}rem ${formatPxToRem(12)}rem rgba(0, 0, 0, 0.08);
`;

export const CardTitle = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(4)}rem;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(16)}rem;
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;

    gap: ${formatPxToRem(6)}rem;
`;

export const ErrorMessage = styled.div`
    display: flex;
    align-items: center;

    padding: ${formatPxToRem(12)}rem ${formatPxToRem(16)}rem;

    background-color: ${({ theme }) => theme.colors.red.default}1A;

    border-radius: ${formatPxToRem(8)}rem;

    border: ${formatPxToRem(1)}rem solid ${({ theme }) => theme.colors.red.default};
`;

export const RegisterLink = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    gap: ${formatPxToRem(4)}rem;
`;

export const LinkButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    color: ${({ theme }) => theme.colors.purple.default};
    font-size: ${formatPxToRem(14)}rem;
    font-weight: 600;
    font-family: ${({ theme }) => theme.fonts.poppins};

    text-decoration: underline;

    &:hover {
        opacity: 0.8;
    }
`;
