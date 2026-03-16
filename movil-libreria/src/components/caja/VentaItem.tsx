import { Venta } from "@/interface";
import { obtenerHora } from "@/utils/ObtenerHora";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  venta: Venta;
}

export default function VentaItem({ venta }: Props) {
  const getTipoStyles = (tipo: string) => {
    switch (tipo) {
      case "Efectivo":
        return {
          container: "bg-emerald-50 border-emerald-100",
          text: "text-emerald-700",
          icon: "#10b981",
        };
      case "Debito":
        return {
          container: "bg-blue-50 border-blue-100",
          text: "text-blue-700",
          icon: "#3b82f6",
        };
      case "Credito":
        return {
          container: "bg-violet-50 border-violet-100",
          text: "text-violet-700",
          icon: "#8b5cf6",
        };
      default:
        return {
          container: "bg-gray-50 border-gray-100",
          text: "text-gray-700",
          icon: "#6b7280",
        };
    }
  };

  const styles = getTipoStyles(venta.tipo.nombre);

  return (
    <View className="flex-row items-center bg-white py-4 px-1">
      {/* Time and Icon Column */}
      <View className="items-center mr-4">
        <Text className="text-gray-400 text-xs font-bold uppercase mb-1">
          {obtenerHora(venta.fecha)}
        </Text>
        <View className={`${styles.container} p-2 rounded-xl border`}>
          <Ionicons name="receipt-outline" size={20} color={styles.icon} />
        </View>
      </View>

      {/* Main Info Column */}
      <View className="flex-1 justify-center">
        <View className="flex-row items-center mb-1">
          <Text className="text-gray-800 font-bold text-base mr-2" numberOfLines={1}>
            {venta.cliente || "Consumidor Final"}
          </Text>
        </View>
        <Text className="text-gray-400 text-xs font-medium uppercase tracking-tighter">
          FAC X 0000-{venta.numero.toString().padStart(8, "0")}
        </Text>
      </View>

      {/* Amount and Tag Column */}
      <View className="items-end">
        <Text className="text-gray-900 font-black text-lg mb-1">
          ${venta.total.toFixed(2)}
        </Text>
        <View className={`${styles.container} px-2 py-0.5 rounded-full border`}>
          <Text className={`${styles.text} text-[10px] font-bold uppercase`}>
            {venta.tipo.nombre}
          </Text>
        </View>
      </View>
    </View>
  );
}
