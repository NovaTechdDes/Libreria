import { useAppTheme } from '@/hooks/useAppTheme';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface Props {
  message?: string;
}

export const Loading = ({ message = 'Cargando...' }: Props) => {
  const { isDark, colors } = useAppTheme();

  return (
    <View className="flex-1 mt-20 items-center justify-center bg-white/80 dark:bg-slate-950/80 inset-0 z-50">
      <View className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl items-center border border-slate-100 dark:border-slate-800">
        <ActivityIndicator size="large" color={colors.accent} />
        <Text className="mt-4 text-slate-600 dark:text-slate-300 font-medium tracking-tight">{message}</Text>
      </View>
    </View>
  );
};
