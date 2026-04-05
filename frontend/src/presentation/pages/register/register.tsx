import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { Text } from "../../components/text/text";
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
    LoginLink,
    Main,
    SuccessMessage,
    Welcome,
} from "./register.styles";
import { IRegister } from "./register.types";

export const Register: React.FC<IRegister> = ({ remoteRegister }) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (password !== confirmPassword) {
            setErrorMessage("As senhas não coincidem");
            return;
        }

        setIsLoading(true);

        try {
            await remoteRegister.register({
                name,
                username,
                email,
                password,
                confirm_password: confirmPassword,
            });

            setSuccessMessage("Conta criada com sucesso! Redirecionando...");

            setTimeout(() => navigate("/login"), 1500);
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Erro ao criar conta"
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
                            Criar conta
                        </Text>
                        <Text size="14" weight="400" color="neutrals-weakness">
                            Preencha os campos abaixo para se cadastrar
                        </Text>
                    </CardTitle>

                    <Form onSubmit={handleSubmit}>
                        <Field>
                            <Text size="14" weight="500">
                                Nome completo
                            </Text>
                            <Input
                                placeholder="Digite seu nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </Field>

                        <Field>
                            <Text size="14" weight="500">
                                Usuário
                            </Text>
                            <Input
                                placeholder="Escolha um nome de usuário"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </Field>

                        <Field>
                            <Text size="14" weight="500">
                                E-mail
                            </Text>
                            <Input
                                type="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                placeholder="Crie uma senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </Field>

                        <Field>
                            <Text size="14" weight="500">
                                Confirmar senha
                            </Text>
                            <Input
                                type="password"
                                placeholder="Repita sua senha"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
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

                        {successMessage && (
                            <SuccessMessage>
                                <Text size="14" weight="400" color="green-default">
                                    {successMessage}
                                </Text>
                            </SuccessMessage>
                        )}

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Cadastrando..." : "Cadastrar"}
                        </Button>
                    </Form>

                    <LoginLink>
                        <Text size="14" weight="400" color="neutrals-weakness">
                            Já tem uma conta?
                        </Text>
                        <LinkButton
                            type="button"
                            onClick={() => navigate("/login")}
                        >
                            Entrar
                        </LinkButton>
                    </LoginLink>
                </Card>
            </Main>
        </Container>
    );
};
