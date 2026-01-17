import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabsParamList } from "./types";

import DealsListScreen from "../features/deals/DealsListScreen";
import SavedDealsScreen from "../features/deals/SavedDealsScreen";
import SettingsScreen from "../features/settings/SettingsScreen";

const Tab = createBottomTabNavigator<TabsParamList>();

export function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Deals" component={DealsListScreen} />
      <Tab.Screen name="Saved" component={SavedDealsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
