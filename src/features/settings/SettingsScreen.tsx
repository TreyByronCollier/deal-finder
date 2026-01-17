import React from "react";
import { View, Text, Pressable } from "react-native";
import { useTheme } from "../../theme/useTheme";

export default function SettingsScreen() {
  const { mode, setMode, theme } = useTheme();

  return (
    <View style={{ padding: 16, backgroundColor: theme.colors.background, flex: 1 }}>
      <Text style={{ color: theme.colors.text, marginBottom: 16 }}>Theme: {mode}</Text>

      {(["light", "dark", "system"] as const).map((m) => (
        <Pressable key={m} onPress={() => setMode(m)}>
          <Text style={{ color: theme.colors.primary, paddingVertical: 8 }}>{m === mode ? `✓ ${m}` : m}</Text>
        </Pressable>
      ))}
    </View>
  );
}
