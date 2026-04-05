import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { Text } from "../../components/text/text";
import { useAuth } from "../../contexts/auth/auth.context";
import {
    Card,
    CardTitle,
    Container,
    CustomText,
    ErrorMessage,
    Field,
    Form,
    Header,
    LinkButton,
    Main,
    RegisterLink,
    Welcome,
} from "./login.styles";
import { ILogin } from "./login.types";

export const Login: React.FC<ILogin> = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setIsLoading(true);

        try {
            await login({ username, password });
            navigate("/");
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Erro ao realizar login"
            );
        } finally {
            setIsLoading(false);
        }
    };

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
                <Card>
                    <CardTitle>
                        <Text size="24" weight="600">
                            Entrar
                        </Text>
                        <Text size="14" weight="400" color="neutrals-weakness">
                            Acesse sua conta para gerenciar sua watchlist
                        </Text>
                    </CardTitle>

                    <Form onSubmit={handleSubmit}>
                        <Field>
                            <Text size="14" weight="500">
                                Usuário
                            </Text>
                            <Input
                                placeholder="Digite seu usuário"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </Field>

                        <Field>
                            <Text size="14" weight="500">
                                Senha
                            </Text>
                            <Input
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </Field>

                        {errorMessage && (
                            <ErrorMessage>
                                <Text size="14" weight="400" color="red-default">
                                    {errorMessage}
                                </Text>
                            </ErrorMessage>
                        )}

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Entrando..." : "Entrar"}
                        </Button>
                    </Form>

                    <RegisterLink>
                        <Text size="14" weight="400" color="neutrals-weakness">
                            Não tem uma conta?
                        </Text>
                        <LinkButton
                            type="button"
                            onClick={() => navigate("/register")}
                        >
                            Cadastre-se
                        </LinkButton>
                    </RegisterLink>
                </Card>
            </Main>
        </Container>
    );
};
