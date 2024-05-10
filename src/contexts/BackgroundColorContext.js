import { createContext } from "react";

export const backgroundColors = {
  primary: "primary",
  blue: "red",
  green: "green",
};

export const BackgroundColorContext = createContext({
  color: backgroundColors.blue,
  changeColor: (color) => {},
});
