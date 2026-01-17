import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";
import { TabsNavigator } from "./TabsNavigator";
import DealDetailsScreen from "../features/deals/DealDetailsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="DealDetails" component={DealDetailsScreen} options={{ title: "Deal Details" }} />
    </Stack.Navigator>
  );
}
