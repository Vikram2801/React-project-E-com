import { createTheme, ThemeProvider } from "@mui/material";
import React, { createContext, useMemo, useState } from "react";

export const Theme = createContext({
  toggleTheme: () => {},
  mode: "light",
});

export const ThemeContext = ({ children }) => {
  let [mode, setMode] = useState("light");
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
      },
    });
  }, [mode]);
  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <Theme.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Theme.Provider>
  );
};
