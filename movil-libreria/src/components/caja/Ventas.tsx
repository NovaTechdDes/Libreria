import { useAppTheme } from "@/hooks/useAppTheme";

import { useVenta } from "@/hooks/venta/useVenta";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Loading } from "../ui/Loading";
import VentaItem from "./VentaItem";

const Ventas = () => {
  const { isDark, colors } = useAppTheme();
  const { data: ventas, isLoading } = useVenta();

  if (isLoading) return <Loading />;

  return (
    <View className="mb-10 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-xl font-black text-gray-800 dark:text-slate-100">
            Ventas del día
          </Text>
          <Text className="text-gray-400 dark:text-slate-500 text-xs font-medium">
            Historial de transacciones
          </Text>
        </View>
      </View>

      {/* Empty State / Skeleton Area */}
      {ventas?.length === 0 ? (
        <View className="items-center justify-center py-10">
          <View className="bg-gray-50 dark:bg-slate-800 p-6 rounded-full mb-4">
            <Ionicons
              name="receipt-outline"
              size={40}
              color={isDark ? "#475569" : "#9ca3af"}
            />
          </View>
          <Text className="text-gray-600 dark:text-slate-400 font-bold text-base text-center">
            Sin ventas aún
          </Text>
          <Text className="text-gray-400 dark:text-slate-500 text-sm text-center mt-1">
            Las ventas aparecerán aquí en tiempo real
          </Text>
        </View>
      ) : (
        <View>
          {ventas?.map((item, index) => (
            <React.Fragment key={item.id}>
              <VentaItem venta={item} />
              {index < ventas.length - 1 && (
                <View className="h-[1px] bg-gray-50 dark:bg-slate-800 ml-16" />
              )}
            </React.Fragment>
          ))}
        </View>
      )}
    </View>
  );
};

export default Ventas;
