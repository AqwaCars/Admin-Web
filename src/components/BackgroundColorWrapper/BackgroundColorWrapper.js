import React, { useState } from "react";
import { BackgroundColorContext } from "contexts/BackgroundColorContext"; // Corrected import

// Directly import backgroundColors from the context file
import { backgroundColors } from "contexts/BackgroundColorContext";

export default function BackgroundColorWrapper(props) {
  // Initialize color state with the value from backgroundColors
  const [color, setColor] = useState(backgroundColors.blue);

  function changeColor(newColor) {
    setColor(newColor);
  }

  return (
    <BackgroundColorContext.Provider
      value={{ color: color, changeColor: changeColor }}
    >
      {props.children}
    </BackgroundColorContext.Provider>
  );
}
