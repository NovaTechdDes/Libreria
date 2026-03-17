import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface Props {
  message?: string;
}

export const Loading = ({ message = "Cargando..." }: Props) => {
  return (
    <View className="flex-1 items-center justify-center bg-white/80 absolute inset-0 z-50">
      <View className="bg-white p-6 rounded-3xl shadow-xl items-center border border-slate-100">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="mt-4 text-slate-600 font-medium tracking-tight">
          {message}
        </Text>
      </View>
    </View>
  );
};
