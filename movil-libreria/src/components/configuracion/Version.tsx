import { useAppTheme } from '@/hooks/useAppTheme';
import { mensaje } from '@/utils/mensaje';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

export default function Version() {
  const { isDark, colors } = useAppTheme();
  const [checking, setChecking] = useState(false);
  const version = Constants.expoConfig?.version;

  const handleActualizar = async () => {
    setChecking(true);

    const update = await Updates.checkForUpdateAsync();

    try {
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
        mensaje('Actualización', 'Actualización exitosa', 'success');
      } else {
        mensaje('No hay actualizaciones', 'Ya tienes la última versión', 'info');
      }
    } catch (error) {
      mensaje('Error', 'Error al buscar actualizaciones', 'error');
    } finally {
      setChecking(false);
    }
  };

  return (
    <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 mb-10">
      <View className="flex-row items-center gap-3 mb-6">
        <View className="bg-gray-100 dark:bg-slate-800 p-2.5 rounded-2xl">
          <Ionicons name="information-circle-outline" size={20} color={colors.icon} />
        </View>
        <Text className="text-xl font-bold text-gray-800 dark:text-slate-100">Información</Text>
      </View>

      <View className="flex-row justify-between items-center mb-6 px-1">
        <View>
          <Text className="text-gray-800 dark:text-slate-100 font-bold text-base">Versión</Text>
          <Text className="text-gray-400 dark:text-slate-500 text-sm">v{version} Stable</Text>
        </View>
        <View className="bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full">
          <Text className="text-gray-500 dark:text-slate-400 text-xs font-bold italic">Latest</Text>
        </View>
      </View>

      <Pressable
        onPress={handleActualizar}
        disabled={checking}
        className="flex-row items-center justify-center bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl py-4"
      >
        {checking ? (
          <ActivityIndicator color={colors.icon} />
        ) : (
          <>
            <Ionicons name="refresh-outline" size={20} color={colors.icon} />
            <Text className="text-gray-600 dark:text-slate-400 font-bold ml-2">Buscar Actualización</Text>
          </>
        )}
      </Pressable>
    </View>
  );
}
