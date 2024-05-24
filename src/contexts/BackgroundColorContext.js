import { createContext } from "react";

const backgroundColors = {
  primary: "primary",
  blue: "blue",
  green: "green",
};

const BackgroundColorContext = createContext({
  color: backgroundColors.blue, // This is fine if you specifically want to start with "blue"
  changeColor: (color) => {},
});

// Correctly export both backgroundColors and BackgroundColorContext
export { backgroundColors, BackgroundColorContext };
