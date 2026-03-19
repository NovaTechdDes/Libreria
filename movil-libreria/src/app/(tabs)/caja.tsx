import Vales from "@/components/caja/Vales";
import Ventas from "@/components/caja/Ventas";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function CajaScream() {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-slate-950 px-5 pt-6">
      {/* Header Section */}
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-800 dark:text-slate-100">
          Caja
        </Text>
        <Text className="text-gray-500 dark:text-slate-400 mt-1">
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
