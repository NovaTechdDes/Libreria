import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function Sincronizacion() {
  const { isDark, colors } = useAppTheme();
  const [servidor, setServidor] = useState<boolean>(false);

  const handleServidor = async () => {
    await AsyncStorage.setItem('servidor', `${!servidor}`);
    setServidor(!servidor);
  };

  useEffect(() => {
    const getLocal = async () => {
      const servidor = await AsyncStorage.getItem('servidor');
      if (servidor) {
        setServidor(servidor === 'true');
      }
    };
    getLocal();
  }, []);

  return (
    <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 mb-6">
      <View className="flex-row items-center gap-3 mb-6">
        <View className="bg-orange-100 dark:bg-orange-900/30 p-2.5 rounded-2xl">
          <Ionicons name="sync-outline" size={20} color={isDark ? '#fb923c' : '#f97316'} />
        </View>
        <Text className="text-xl font-bold text-gray-800 dark:text-slate-100">Sincronización</Text>
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
