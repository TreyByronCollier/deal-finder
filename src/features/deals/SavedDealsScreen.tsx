import React, { useMemo } from "react";
import {
  FlatList,
  View,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { useSavedDeals } from "./hooks/SavedDealsContext";
import { mockDeals } from "./deals.mock";
import { DealCard } from "./components/DealCard";
import { useTheme } from "../../theme/useTheme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList, "Tabs">;

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SavedDealsScreen() {
  const { savedIds } = useSavedDeals();
  const navigation = useNavigation<Nav>();
  const { theme } = useTheme();

  const savedDeals = useMemo(
    () => mockDeals.filter((d) => savedIds.includes(d.id)),
    [savedIds],
  );

  const onPressDeal = (id: string) =>
    navigation.navigate("DealDetails", { dealId: id });

  if (savedDeals.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <Text style={{ color: theme.colors.text }}>No saved deals yet</Text>
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.background, padding: 12 }}
    >
      <FlatList
        data={savedDeals}
        renderItem={({ item }) => (
          <DealCard deal={item} onPress={onPressDeal} animateOnRemove />
        )}
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        windowSize={7}
        removeClippedSubviews
      />
    </View>
  );
}
