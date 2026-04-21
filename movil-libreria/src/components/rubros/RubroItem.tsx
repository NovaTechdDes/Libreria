import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface Props {
  item: { id_rubro: number | null; nombre_rubro: string };
  isSelected: boolean;
  onPress: () => void;
}

export default function RubroItem({ item, isSelected, onPress }: Props) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        className={`
          px-6 py-2.5 rounded-full border
          ${isSelected ? 'bg-blue-600 border-blue-600' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}
        `}
      >
        <Text
          className={`
            text-sm font-semibold
            ${isSelected ? 'text-white' : 'text-slate-600 dark:text-slate-400'}
          `}
        >
          {item.nombre_rubro}
        </Text>
      </Pressable>
    </View>
  );
}
