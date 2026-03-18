import { useAppTheme } from "@/hooks/useAppTheme";
import { vales } from "@/data/vales";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function Vales() {
  const { isDark, colors } = useAppTheme();

  return (
    <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 mb-8">
      {/* Total */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-gray-400 dark:text-slate-500 font-medium uppercase tracking-wider text-xs">
          Total del dia
        </Text>
        <View className="bg-green-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
          <Text className="text-green-700 dark:text-emerald-400 text-xs font-bold">Activo</Text>
        </View>
      </View>
 
      <Text className="text-4xl font-black text-gray-900 dark:text-slate-100 mb-6">
        ${vales.total.toFixed(2)}
      </Text>

      <View className="space-y-4">
        {/* Row: Efectivo */}
        <View className="flex-row justify-between items-center py-3 border-b border-gray-50 dark:border-slate-800">
          <View className="flex-row items-center gap-3">
            <View className="bg-emerald-100 dark:bg-emerald-900/40 p-2.5 rounded-2xl">
              <Ionicons name="cash-outline" size={20} color={isDark ? "#34d399" : "#059669"} />
            </View>
            <Text className="text-gray-700 dark:text-slate-300 font-semibold text-base">
              Efectivo
            </Text>
          </View>
          <Text className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">
            ${vales.efectivo.toFixed(2)}
          </Text>
        </View>

        {/* Row: Debito */}
        <View className="flex-row justify-between items-center py-3 border-b border-gray-50 dark:border-slate-800">
          <View className="flex-row items-center gap-3">
            <View className="bg-blue-100 dark:bg-blue-900/40 p-2.5 rounded-2xl">
              <Ionicons name="card-outline" size={20} color={isDark ? "#60a5fa" : "#2563eb"} />
            </View>
            <Text className="text-gray-700 dark:text-slate-300 font-semibold text-base">
              T. Débito
            </Text>
          </View>
          <Text className="text-blue-600 dark:text-blue-400 font-bold text-lg">
            ${vales.debito.toFixed(2)}
          </Text>
        </View>

        {/* Row: Credito */}
        <View className="flex-row justify-between items-center py-3">
          <View className="flex-row items-center gap-3">
            <View className="bg-violet-100 dark:bg-violet-900/40 p-2.5 rounded-2xl">
              <Ionicons name="card-outline" size={20} color={isDark ? "#a78bfa" : "#7c3aed"} />
            </View>
            <Text className="text-gray-700 dark:text-slate-300 font-semibold text-base">
              T. Crédito
            </Text>
          </View>
          <Text className="text-violet-600 dark:text-violet-400 font-bold text-lg">
            ${vales.credito.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}
