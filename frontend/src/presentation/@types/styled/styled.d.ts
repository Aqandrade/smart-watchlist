/* eslint-disable @typescript-eslint/naming-convention */

import "styled-components";
import { type defaultTheme } from "../../themes/themes";

declare module "styled-components" {
    type ThemeType = typeof defaultTheme;
    export interface DefaultTheme extends ThemeType {}
}
