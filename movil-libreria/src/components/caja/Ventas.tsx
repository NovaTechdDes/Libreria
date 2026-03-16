import { ventas } from "@/data/ventas";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import VentaItem from "./VentaItem";

const Ventas = () => {
  return (
    <View className="mb-10 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-xl font-black text-gray-800">Ventas del día</Text>
          <Text className="text-gray-400 text-xs font-medium">Historial de transacciones</Text>
        </View>
        <TouchableOpacity className="bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
          <Text className="text-blue-600 font-bold text-xs">Ver todas</Text>
        </TouchableOpacity>
      </View>

      {/* Empty State / Skeleton Area */}
      {ventas.length === 0 ? (
        <View className="items-center justify-center py-10">
          <View className="bg-gray-50 p-6 rounded-full mb-4">
            <Ionicons name="receipt-outline" size={40} color="#9ca3af" />
          </View>
          <Text className="text-gray-600 font-bold text-base text-center">
            Sin ventas aún
          </Text>
          <Text className="text-gray-400 text-sm text-center mt-1">
            Las ventas aparecerán aquí en tiempo real
          </Text>
        </View>
      ) : (
        <View>
          {ventas.map((item, index) => (
            <React.Fragment key={item.id}>
              <VentaItem venta={item} />
              {index < ventas.length - 1 && (
                <View className="h-[1px] bg-gray-50 ml-16" />
              )}
            </React.Fragment>
          ))}
        </View>
      )}
    </View>
  );
};

export default Ventas;
