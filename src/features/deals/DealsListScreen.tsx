import React, { useCallback } from "react";
import { FlatList, View } from "react-native";
import { mockDeals } from "./deals.mock";
import { DealCard } from "./components/DealCard";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/useTheme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList, "Tabs">;

export default function DealsListScreen() {
  const navigation = useNavigation<Nav>();
  const { theme } = useTheme();

  const onPressDeal = useCallback(
    (id: string) => {
      navigation.navigate("DealDetails", { dealId: id });
    },
    [navigation],
  );

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.background, padding: 12 }}
    >
      <FlatList
        data={mockDeals}
        renderItem={({ item, index }) => (
          <DealCard deal={item} onPress={onPressDeal} fadeIn index={index} />
        )}
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        windowSize={7}
        removeClippedSubviews
      />
    </View>
  );
}
