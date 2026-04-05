import { type ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";

import { defaultTheme } from "./presentation/themes/themes";
import { ApplicationRoutes } from "./main/routes/routes";
import { AuthProvider } from "./presentation/contexts/auth/auth.context";
import {
    makeRemoteLogin,
    makeRemoteLogout,
    makeRemoteRegister,
} from "./main/factories/usecases";

function App(): ReactNode {
    return (
        <ThemeProvider theme={defaultTheme}>
            <RecoilRoot>
                <AuthProvider
                    remoteLogin={makeRemoteLogin()}
                    remoteRegister={makeRemoteRegister()}
                    remoteLogout={makeRemoteLogout()}
                >
                    <ApplicationRoutes />
                </AuthProvider>
            </RecoilRoot>
        </ThemeProvider>
    );
}

export default App;
