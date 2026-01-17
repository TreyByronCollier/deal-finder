import React from "react";
import { View, Text } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";

type DetailsRoute = RouteProp<RootStackParamList, "DealDetails">;

export default function DealDetailsScreen() {
  const route = useRoute<DetailsRoute>();

  return (
    <View>
      <Text>Deal Details for {route.params.dealId}</Text>
    </View>
  );
}
