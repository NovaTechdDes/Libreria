import { probarConexion } from "@/actions/conexion.actions";
import { mensaje } from "@/utils/mensaje";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

interface URL {
  url: string;
}

const queryClient = new QueryClient();

export default function Conexion() {
  const [loading, setLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [ip, setIp] = useState("");

  useEffect(() => {
    const getIp = async () => {
      const ip = await AsyncStorage.getItem("url");
      if (ip) {
        setIp(ip);
      }
    };
    getIp();
  }, []);

  const testConexion = async () => {
    setTestLoading(true);
    const test = await probarConexion();
    if (test) {
      mensaje("success", "Conexión exitosa", "");
    } else {
      mensaje("error", "Conexión fallida", "");
    }
    setTestLoading(false);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem("url", ip);
      queryClient.invalidateQueries();
      mensaje("success", "Guardado exitosamente", "");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
      <View className="flex-row items-center gap-3 mb-6">
        <View className="bg-blue-100 p-2.5 rounded-2xl">
          <Ionicons name="server-outline" size={20} color="#2563eb" />
        </View>
        <Text className="text-xl font-bold text-gray-800">
          Conexión al servidor
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-2 px-1">
          Dirección IP del servidor
        </Text>
        <TextInput
          placeholder="192.168.0.168:3000"
          value={ip}
          onChangeText={setIp}
          placeholderTextColor="#9ca3af"
          className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-lg text-gray-800"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <Pressable
          onPress={onSubmit}
          className="bg-blue-600 rounded-2xl py-4 items-center shadow-md shadow-blue-200 mb-4"
        >
          <Text className="text-white font-black text-lg">Aplicar Cambios</Text>
        </Pressable>
      )}

      <Pressable
        onPress={testConexion}
        className="flex-row items-center justify-center py-2 opacity-60 bg-gray-300 rounded-2xl p-2"
      >
        <Ionicons name="pulse-outline" size={18} color="#4b5563" />
        {testLoading && <ActivityIndicator size="small" color="#4b5563" />}
        <Text className="text-gray-600 font-bold ml-2 active:text-gray-500  rounded-2xl p-2">
          Test de Conexión
        </Text>
      </Pressable>
    </View>
  );
}
