import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { RootNavigator } from "./navigation/RootNavigator";
import { ThemeProvider } from "./theme/ThemeContext";
import { useTheme } from "./theme/useTheme";
import { SavedDealsProvider } from "./features/deals/hooks/SavedDealsContext";

function AppNavigation() {
  const { theme } = useTheme();
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...theme.colors,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SavedDealsProvider>
        <AppNavigation />
      </SavedDealsProvider>
    </ThemeProvider>
  );
}
