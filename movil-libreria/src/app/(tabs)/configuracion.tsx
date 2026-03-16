import Conexion from "@/components/configuracion/Conexion";
import Sincronizacion from "@/components/configuracion/Sincronizacion";
import Version from "@/components/configuracion/Version";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function ConfiguracionScream() {
  return (
    <ScrollView className="flex-1 bg-gray-50 px-5 pt-6">
      {/* Header Section */}
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-800">Caja</Text>
        <Text className="text-gray-500 mt-1">
          Configura y gestiona tu aplicación
        </Text>
      </View>

      {/* 1. Conexion */}
      <Conexion />

      {/* 2. Sincronizacion */}
      <Sincronizacion />

      {/* 3. Version */}
      <Version />
    </ScrollView>
  );
}
