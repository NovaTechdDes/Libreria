import { useVenta } from "@/hooks/venta/useVenta";
import React from "react";
import { Text, View } from "react-native";
import { Loading } from "../ui/Loading";
import VentaItem from "./VentaItem";
import VentasVacia from "./VentasVacia";

const Ventas = () => {
  const { data: ventas, isLoading } = useVenta();

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

      {/* Empty State / List Area */}
      <View>
        {isLoading ? (
          <Loading />
        ) : ventas && ventas.length > 0 ? (
          <View className="gap-4">
            {ventas.map((item) => (
              <VentaItem key={item.id} venta={item} />
            ))}
          </View>
        ) : (
          <VentasVacia />
        )}
      </View>
    </View>
  );
};


export default Ventas;
