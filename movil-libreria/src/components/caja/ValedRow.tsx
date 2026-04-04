import { useAppTheme } from '@/hooks/useAppTheme';
import { Vale } from '@/interface/Vale';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  vale: Vale;
  mostrar: boolean;
}

export default function ValedRow({ vale, mostrar }: Props) {
  const { isDark } = useAppTheme();

  return (
    <View className="flex-row justify-between items-center py-3 border-b border-gray-50 dark:border-slate-800">
      <View className="flex-row items-center gap-3">
        <View className="bg-emerald-100 dark:bg-emerald-900/40 p-2.5 rounded-2xl">
          <Ionicons name="cash-outline" size={20} color={isDark ? '#34d399' : '#059669'} />
        </View>
        <Text className="text-gray-700 dark:text-slate-300 font-semibold text-base">{vale.tipo_importe}</Text>
      </View>

      <Text className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">{mostrar ? `$${vale.saldo?.toFixed(2)}` : '-'}</Text>
    </View>
  );
}
