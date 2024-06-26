import { createContext } from "react";

export const themes = {
  dark: "dark-content",
  light: "white-content",
};

export const ThemeContext = createContext({
  theme: themes.light,
  changeTheme: () => {},
});

export default ThemeContext;
