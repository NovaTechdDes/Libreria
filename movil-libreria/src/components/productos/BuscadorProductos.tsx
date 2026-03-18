import { useAppTheme } from "@/hooks/useAppTheme";
import { useProductoStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

export default function BuscadorProductos() {
  const { buscador, setBuscador } = useProductoStore();
  const { isDark, colors } = useAppTheme();

  return (
    <View className="flex-row items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-3 mb-2 shadow-sm">
      <Ionicons name="search-outline" size={20} color={colors.icon} />
      <TextInput
        value={buscador}
        onChangeText={setBuscador}
        className="flex-1 ml-3 text-slate-800 dark:text-slate-100 font-medium text-base"
        placeholder="Buscar productos..."
        placeholderTextColor={colors.placeholder}
      />
      {buscador.length > 0 && (
        <Ionicons
          name="close-circle"
          size={20}
          color={colors.icon}
          onPress={() => setBuscador("")}
        />
      )}
    </View>
  );
}
