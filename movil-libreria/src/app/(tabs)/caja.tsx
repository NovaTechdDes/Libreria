import Vales from "@/components/caja/Vales";
import Ventas from "@/components/caja/Ventas";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function CajaScream() {
  return (
    <ScrollView className="flex-1 bg-gray-50 px-5 pt-6">
      {/* Header Section */}
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-800">Caja</Text>
        <Text className="text-gray-500 mt-1">
          Resumen general y ventas del día
        </Text>
      </View>

      {/* Main Stats Card */}
      <Vales />

      {/* Litado de ventas */}
      <Ventas />
    </ScrollView>
  );
}
