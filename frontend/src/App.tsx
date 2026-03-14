import { type ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import { defaultTheme } from "./presentation/themes/themes";
import { ApplicationRoutes } from "./main/routes/routes";
import { RecoilRoot } from "recoil";

function App(): ReactNode {
    return (
        <ThemeProvider theme={defaultTheme}>
            <RecoilRoot>
                <ApplicationRoutes />
            </RecoilRoot>
        </ThemeProvider>
    );
}

export default App;