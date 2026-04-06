import { useCaja } from '@/hooks/caja/useCaja';
import { Caja } from '@/interface';
import React from 'react';
import { Text, View } from 'react-native';
import { Loading } from '../ui/Loading';
import VentaItem from './VentaItem';
import VentasVacia from './VentasVacia';

const Ventas = () => {
  const { data: cajas, isLoading } = useCaja();

  return (
    <View className="mt-5 flex-1 bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-slate-800">
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-xl font-black text-gray-800 dark:text-slate-100">Ventas del día</Text>
          <Text className="text-gray-400 dark:text-slate-500 text-xs font-medium">Historial de transacciones</Text>
        </View>
      </View>

      {/* Empty State / List Area */}
      <View>
        {isLoading ? (
          <Loading />
        ) : cajas && cajas.length > 0 ? (
          <View className="gap-4">
            {cajas.map((item: Caja) => (
              <VentaItem key={item.id_caja} caja={item} />
            ))}
          </View>
        ) : (
          <VentasVacia />
        )}
      </View>
    </View>
  );
};

export default Ventas;
