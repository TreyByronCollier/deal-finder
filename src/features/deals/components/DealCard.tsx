import React, { memo, useEffect } from "react";
import { Text, View, LayoutAnimation, Pressable } from "react-native";
import { Deal } from "../deals.types";
import { useTheme } from "../../../theme/useTheme";
import { useSavedDeals } from "../hooks/SavedDealsContext";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface Props {
  deal: Deal;
  onPress: (id: string) => void;
  animateOnRemove?: boolean;
  fadeIn?: boolean;
  index?: number;
}

function DealCardBase({
  deal,
  onPress,
  animateOnRemove = false,
  fadeIn = false,
  index = 0,
}: Props) {
  const { theme } = useTheme();
  const { isSaved, saveDeal, unsaveDeal } = useSavedDeals();

  const saved = isSaved(deal.id);

  // Shared values
  const translateY = useSharedValue(20);
  const opacity = useSharedValue(0);
  const scaleCard = useSharedValue(1);
  const scaleHeart = useSharedValue(1);

  // Animated styles
  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: fadeIn ? translateY.value : 0 },
      { scale: scaleCard.value },
    ],
    opacity: fadeIn ? opacity.value : 1,
  }));

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleHeart.value }],
  }));

  // Entrance animation
  useEffect(() => {
    if (fadeIn) {
      const delay = index * 100;
      translateY.value = withDelay(delay, withTiming(0, { duration: 400 }));
      opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    } else {
      translateY.value = 0;
      opacity.value = 1;
    }
  }, []);

  const toggleSave = () => {
    if (animateOnRemove && saved)
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // Heart pop
    scaleHeart.value = withSpring(1.5, { damping: 8, stiffness: 200 }, () => {
      scaleHeart.value = withSpring(1, { damping: 8, stiffness: 200 });
    });

    if (saved) unsaveDeal(deal.id);
    else saveDeal(deal.id);
  };

  return (
    <Animated.View style={animatedCardStyle}>
      <Pressable
        onPressIn={() => {
          scaleCard.value = withSpring(0.97, { damping: 15, stiffness: 200 });
        }}
        onPressOut={() => {
          scaleCard.value = withSpring(1, { damping: 15, stiffness: 200 });
        }}
        onPress={() => onPress(deal.id)}
        style={{
          backgroundColor: theme.colors.card,
          padding: 12,
          borderRadius: 8,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: theme.colors.text, fontWeight: "600" }}>
            {deal.merchant}
          </Text>
          <Pressable onPress={toggleSave}>
            <Animated.View style={animatedHeartStyle}>
              <FontAwesome
                name={saved ? "heart" : "heart-o"}
                size={20}
                color={theme.colors.primary}
              />
            </Animated.View>
          </Pressable>
        </View>

        <Text style={{ color: theme.colors.primary, marginTop: 2 }}>
          {deal.discount.type === "percentage"
            ? `${deal.discount.value}% off`
            : `£${deal.discount.value} off`}
        </Text>
        <Text style={{ color: theme.colors.text, marginTop: 2 }}>
          {deal.title}
        </Text>
        <Text style={{ color: theme.colors.text, opacity: 0.6, marginTop: 4 }}>
          Ends{" "}
          {new Date(deal.expiry).toLocaleDateString("en-GB", {
            month: "short",
            day: "numeric",
          })}
        </Text>

        {deal.tags && (
          <View style={{ flexDirection: "row", marginTop: 6 }}>
            {deal.tags.map((tag) => (
              <View
                key={tag}
                style={{
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  backgroundColor: theme.colors.primary + "22",
                  borderRadius: 4,
                  marginRight: 4,
                }}
              >
                <Text style={{ color: theme.colors.primary, fontSize: 12 }}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

export const DealCard = memo(DealCardBase);
