import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/hooks/useAppTheme";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Sincronizacion() {
  const { isDark, colors } = useAppTheme();

  return (
    <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 mb-6">
      <View className="flex-row items-center gap-3 mb-6">
        <View className="bg-orange-100 dark:bg-orange-900/30 p-2.5 rounded-2xl">
          <Ionicons name="sync-outline" size={20} color={isDark ? "#fb923c" : "#f97316"} />
        </View>
        <Text className="text-xl font-bold text-gray-800 dark:text-slate-100">Sincronización</Text>
      </View>

      <TouchableOpacity className="flex-row items-center justify-between bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 rounded-2xl p-4">
        <View>
          <Text className="text-orange-900 dark:text-orange-200 font-bold text-base">
            Obtener Productos
          </Text>
          <Text className="text-orange-700 dark:text-orange-300 text-xs opacity-70">
            Actualizar base de datos local
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={isDark ? "#fb923c" : "#f97316"} />
      </TouchableOpacity>
    </View>
  );
}
