import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function VentasVacia() {
  const { isDark } = useAppTheme();
  return (
    <View className="items-center justify-center py-10">
      <View className="bg-gray-50 dark:bg-slate-800 p-6 rounded-full mb-4">
        <Ionicons
          name="receipt-outline"
          size={40}
          color={isDark ? "#475569" : "#9ca3af"}
        />
      </View>
      <Text className="text-gray-600 dark:text-slate-400 font-bold text-base text-center">
        Sin ventas aún
      </Text>
      <Text className="text-gray-400 dark:text-slate-500 text-sm text-center mt-1">
        Las ventas aparecerán aquí en tiempo real
      </Text>
    </View>
  );
}
