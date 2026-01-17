import React, { createContext, useCallback, useEffect, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemeName, lightTheme, darkTheme, Theme } from "./themes";

const STORAGE_KEY = "theme-preference";

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeName;
  setMode: (mode: ThemeName) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  mode: "system",
  setMode: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeName>("system");

  const systemScheme = Appearance.getColorScheme();

  const theme = mode === "dark" ? darkTheme : mode === "light" ? lightTheme : systemScheme === "dark" ? darkTheme : lightTheme;

  const setMode = useCallback(async (m: ThemeName) => {
    setModeState(m);
    await AsyncStorage.setItem(STORAGE_KEY, m);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved === "light" || saved === "dark" || saved === "system") {
        setModeState(saved);
      }
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, mode, setMode }}>{children}</ThemeContext.Provider>;
};
