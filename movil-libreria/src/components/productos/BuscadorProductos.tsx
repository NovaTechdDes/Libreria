import { useProductoStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

export default function BuscadorProductos() {
  const { buscador, setBuscador } = useProductoStore();

  return (
    <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2 mb-2 shadow-sm">
      <Ionicons name="search-outline" size={20} color="#64748b" />
      <TextInput
        value={buscador}
        onChangeText={setBuscador}
        className="flex-1 ml-3 text-slate-900 font-medium text-base"
        placeholder="Buscar productos..."
        placeholderTextColor="#94a3b8"
      />
      {buscador.length > 0 && (
        <Ionicons
          name="close-circle"
          size={20}
          color="#94a3b8"
          onPress={() => setBuscador("")}
        />
      )}
    </View>
  );
}
