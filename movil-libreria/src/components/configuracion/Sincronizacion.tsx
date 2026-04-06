import { useAppTheme } from '@/hooks/useAppTheme';
import { useGlobalStore } from '@/store/globalStore';
import { mensaje } from '@/utils/mensaje';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';

export default function Sincronizacion() {
  const { servidor, setServidor } = useGlobalStore();
  const { isDark, colors } = useAppTheme();
  const [ip, setIp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleServidor = async () => {
    setServidor(!servidor);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem('url_remoto', ip);
      mensaje('success', 'Guardado exitosamente de conexion remota', '');
    } catch (error) {
      mensaje('error', 'Error al guardar', '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getIp = async () => {
      const ip = await AsyncStorage.getItem('url_remoto');
      if (ip) {
        setIp(ip);
      }
    };
    getIp();
  }, []);

  return (
    <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 mb-6">
      <View className="flex-row items-center gap-3 mb-6">
        <View className="bg-orange-100 dark:bg-orange-900/30 p-2.5 rounded-2xl">
          <Ionicons name="sync-outline" size={20} color={isDark ? '#fb923c' : '#f97316'} />
        </View>
        <Text className="text-xl font-bold text-gray-800 dark:text-slate-100">Sincronización</Text>
      </View>

      <View>
        <View className="mb-6">
          <Text className="text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-2 px-1">Dirección IP del servidor remoto</Text>
          <TextInput
            placeholder="192.168.0.168:3000"
            value={ip}
            onChangeText={setIp}
            placeholderTextColor={colors.placeholder}
            className="bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 py-3 text-lg text-gray-800 dark:text-slate-100"
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors.accent} />
        ) : (
          <Pressable onPress={onSubmit} className="bg-blue-600 rounded-2xl py-4 items-center shadow-md shadow-blue-200 mb-4">
            <Text className="text-white font-black text-lg">Aplicar Cambios Remotos</Text>
          </Pressable>
        )}
      </View>

      <Pressable onPress={handleServidor} className="flex-row items-center justify-between bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 rounded-2xl p-4">
        <View>
          {servidor ? (
            <Text className="text-orange-900 dark:text-orange-200 font-bold text-base">Uso Servidor</Text>
          ) : (
            <Text className="text-orange-900 dark:text-orange-200 font-bold text-base">Uso Local</Text>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color={isDark ? '#fb923c' : '#f97316'} />
      </Pressable>
    </View>
  );
}
