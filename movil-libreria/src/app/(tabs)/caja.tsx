import Vales from "@/components/caja/Vales";
import Ventas from "@/components/caja/Ventas";
import { useVenta } from "@/hooks/venta/useVenta";
import React, { useState, useCallback } from "react";
import { ScrollView, Text, View, RefreshControl } from "react-native";

export default function CajaScreen() {
  const { refetch } = useVenta();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <ScrollView
      className="flex-1 bg-gray-50 dark:bg-slate-950 px-5 pt-6"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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

