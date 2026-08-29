import Vales from '@/components/caja/Vales';
import VentaItem from '@/components/caja/VentaItem';
import { useCaja } from '@/hooks/caja/useCaja';
import { useVales } from '@/hooks/caja/useVales';
import { useGlobalStore } from '@/store/globalStore';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

export default function CajaScreen() {
  const { servidor, usuario } = useGlobalStore();
  const { data: cajas, refetch: refetchCaja } = useCaja(servidor);
  const { data: vales, refetch: refetchVales } = useVales(servidor, usuario);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await refetchCaja();
    await refetchVales();
    setRefreshing(false);
  }, [refetchCaja, refetchVales]);

  return (
    <FlatList
      data={cajas}
      keyExtractor={(item) => item.id_caja.toString()}
      renderItem={({ item }) => <VentaItem caja={item} />}
      contentContainerClassName="pb-12"
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className="h-3" />}
      ListHeaderComponent={
        <View className="px-4 pt-4 pb-2">
          {/* Header Section */}
          <View className="mb-5 flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Caja</Text>
              <Text className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Resumen diario y movimientos</Text>
            </View>
            <View className="h-10 w-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 items-center justify-center border border-emerald-500/20">
              <Ionicons name="wallet-outline" size={22} color="#10b981" />
            </View>
          </View>

          {/* Main Stats Card */}
          <Vales />

          {/* Movimientos Section Header */}
          <View className="flex-row items-center justify-between mt-7 mb-3">
            <Text className="text-base font-bold text-slate-900 dark:text-slate-100">Movimientos recientes</Text>
            {cajas && cajas.length > 0 && (
              <View className="bg-slate-200/60 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                <Text className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">{cajas.length}</Text>
              </View>
            )}
          </View>
        </View>
      }
      ListEmptyComponent={
        <View className="items-center justify-center py-12 px-6">
          <View className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 items-center justify-center mb-3">
            <Ionicons name="receipt-outline" size={28} color="#94a3b8" />
          </View>
          <Text className="text-base font-semibold text-slate-700 dark:text-slate-300">No hay movimientos registrados</Text>
          <Text className="text-xs text-slate-400 dark:text-slate-500 text-center mt-1">Los movimientos de caja del día aparecerán listados aquí</Text>
        </View>
      }
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10b981" colors={['#10b981']} />}
    />
  );
}
