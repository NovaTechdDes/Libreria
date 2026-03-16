import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Sincronizacion() {
  return (
    <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
      <View className="flex-row items-center gap-3 mb-6">
        <View className="bg-orange-100 p-2.5 rounded-2xl">
          <Ionicons name="sync-outline" size={20} color="#f97316" />
        </View>
        <Text className="text-xl font-bold text-gray-800">Sincronización</Text>
      </View>

      <TouchableOpacity className="flex-row items-center justify-between bg-orange-50 border border-orange-100 rounded-2xl p-4">
        <View>
          <Text className="text-orange-900 font-bold text-base">
            Obtener Productos
          </Text>
          <Text className="text-orange-700 text-xs opacity-70">
            Actualizar base de datos local
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#f97316" />
      </TouchableOpacity>
    </View>
  );
}
