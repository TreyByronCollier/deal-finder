// src/features/deals/DealDetailsScreen.tsx
import React, { useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  LayoutAnimation,
  Image,
  Dimensions,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useSavedDeals } from "./hooks/SavedDealsContext";
import { useTheme } from "../../theme/useTheme";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { mockDeals } from "./deals.mock";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = 200;

type DealDetailsRouteProp = RouteProp<RootStackParamList, "DealDetails">;
type DealDetailsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "DealDetails"
>;

export default function DealDetailsScreen() {
  const route = useRoute<DealDetailsRouteProp>();
  const navigation = useNavigation<DealDetailsNavProp>();
  const { theme } = useTheme();
  const { isSaved, saveDeal, unsaveDeal } = useSavedDeals();

  const { dealId } = route.params;
  const deal = mockDeals.find((d) => d.id === dealId);
  if (!deal) return <Text>Deal not found</Text>;

  const saved = isSaved(deal.id);

  // Hero image animation
  const imageScale = useSharedValue(0.8);
  const imageOpacity = useSharedValue(0);

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
    opacity: imageOpacity.value,
  }));

  useEffect(() => {
    imageScale.value = withSpring(1, { damping: 10, stiffness: 150 });
    imageOpacity.value = withTiming(1, { duration: 400 });
  }, []);

  // Heart animation
  const scaleHeart = useSharedValue(1);
  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleHeart.value }],
  }));

  const toggleSave = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    scaleHeart.value = withSpring(1.5, { damping: 8, stiffness: 200 }, () => {
      scaleHeart.value = withSpring(1, { damping: 8, stiffness: 200 });
    });
    if (saved) unsaveDeal(deal.id);
    else saveDeal(deal.id);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Hero image */}
      <Animated.View style={animatedImageStyle}>
        <Image
          source={{
            uri:
              deal.image ||
              "https://via.placeholder.com/400x200.png?text=Deal+Image",
          }}
          style={{
            width: "100%",
            height: IMAGE_HEIGHT,
            borderRadius: 12,
            marginBottom: 16,
          }}
        />
      </Animated.View>

      {/* Header: Merchant and Save Button */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text
          style={{ color: theme.colors.text, fontSize: 20, fontWeight: "700" }}
        >
          {deal.merchant}
        </Text>
        <Pressable onPress={toggleSave}>
          <Animated.View style={animatedHeartStyle}>
            <FontAwesome
              name={saved ? "heart" : "heart-o"}
              size={28}
              color={theme.colors.primary}
            />
          </Animated.View>
        </Pressable>
      </View>

      {/* Deal title */}
      <Text style={{ color: theme.colors.text, fontSize: 18, marginBottom: 8 }}>
        {deal.title}
      </Text>

      {/* Discount */}
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        {deal.discount.type === "percentage"
          ? `${deal.discount.value}% off`
          : `£${deal.discount.value} off`}
      </Text>

      {/* Expiry */}
      <Text
        style={{ color: theme.colors.text, opacity: 0.6, marginBottom: 12 }}
      >
        Expires{" "}
        {new Date(deal.expiry).toLocaleDateString("en-GB", {
          month: "short",
          day: "numeric",
        })}
      </Text>

      {/* Tags */}
      {deal.tags && (
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}
        >
          {deal.tags.map((tag) => (
            <View
              key={tag}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: theme.colors.primary + "22",
                borderRadius: 6,
                marginRight: 6,
                marginBottom: 6,
              }}
            >
              <Text style={{ color: theme.colors.primary, fontSize: 12 }}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Description */}
      <Text style={{ color: theme.colors.text, lineHeight: 22 }}>
        This is a great deal from {deal.merchant}. Grab it before it expires!
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </ScrollView>
  );
}
