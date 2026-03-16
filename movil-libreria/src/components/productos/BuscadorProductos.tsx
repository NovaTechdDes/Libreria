import { useProductoStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

export default function BuscadorProductos() {
  const { buscador, setBuscador } = useProductoStore();

  return (
    <View className="flex-row relative bg-white items-center gap-2 p-2 rounded-lg">
      <Ionicons name="search" size={24} color="black" />
      <TextInput
        className=""
        value={buscador}
        onChangeText={setBuscador}
        placeholder="Buscar por nombre, titulo, codigo o marca"
      />
    </View>
  );
}
