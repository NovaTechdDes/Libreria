import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Version() {
  return (
    <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-10">
      <View className="flex-row items-center gap-3 mb-6">
        <View className="bg-gray-100 p-2.5 rounded-2xl">
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#4b5563"
          />
        </View>
        <Text className="text-xl font-bold text-gray-800">Información</Text>
      </View>

      <View className="flex-row justify-between items-center mb-6 px-1">
        <View>
          <Text className="text-gray-800 font-bold text-base">Versión</Text>
          <Text className="text-gray-400 text-sm">v1.0.0 Stable</Text>
        </View>
        <View className="bg-gray-100 px-3 py-1 rounded-full">
          <Text className="text-gray-500 text-xs font-bold italic">Latest</Text>
        </View>
      </View>

      <TouchableOpacity className="flex-row items-center justify-center bg-gray-50 border border-gray-100 rounded-2xl py-4">
        <Ionicons name="refresh-outline" size={20} color="#4b5563" />
        <Text className="text-gray-600 font-bold ml-2">
          Buscar Actualización
        </Text>
      </TouchableOpacity>
    </View>
  );
}
