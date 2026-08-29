import { useAppTheme } from '@/hooks/useAppTheme';
import { Caja } from '@/interface';
import { obtenerFecha } from '@/utils/ObtenerHora';
import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Text, View } from 'react-native';

interface Props {
  caja: Caja;
}

function VentaItem({ caja }: Props) {
  const { isDark } = useAppTheme();

  const getTipoStyles = (tipo: string) => {
    switch (tipo) {
      case 'Contado':
        return {
          container: isDark ? 'bg-emerald-900/20 border-emerald-900/30' : 'bg-emerald-50 border-emerald-100',
          text: isDark ? 'text-emerald-400' : 'text-emerald-700',
          icon: isDark ? '#34d399' : '#10b981',
        };
      case 'Débito':
        return {
          container: isDark ? 'bg-blue-900/20 border-blue-900/30' : 'bg-blue-50 border-blue-100',
          text: isDark ? 'text-blue-400' : 'text-blue-700',
          icon: isDark ? '#60a5fa' : '#3b82f6',
        };
      case 'Crédito':
        return {
          container: isDark ? 'bg-violet-900/20 border-violet-900/30' : 'bg-violet-50 border-violet-100',
          text: isDark ? 'text-violet-400' : 'text-violet-700',
          icon: isDark ? '#a78bfa' : '#8b5cf6',
        };
      default:
        return {
          container: isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100',
          text: isDark ? 'text-slate-400' : 'text-gray-700',
          icon: isDark ? '#94a3b8' : '#6b7280',
        };
    }
  };

  const styles = getTipoStyles(caja?.tipo_importe || 'Efectivo');

  return (
    <View className="mx-4 bg-white dark:bg-slate-900 px-4 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex-row items-center justify-between">
      {/* Left icon & details */}
      <View className="flex-row items-center flex-1 mr-3">
        <View className={`${styles.container} p-2.5 rounded-xl border mr-3 items-center justify-center`}>
          <Ionicons
            name={caja.tipo_mov === 'Ingreso' ? 'arrow-down' : 'arrow-up'}
            size={18}
            color={styles.icon}
          />
        </View>

        <View className="flex-1">
          <View className="flex-row items-center gap-1.5 mb-0.5">
            <Text
              className={`text-sm font-bold ${caja.tipo_mov === 'Ingreso' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}
              numberOfLines={1}
            >
              {caja.tipo_mov || 'Movimiento'}
            </Text>
            <Text className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
              • {obtenerFecha(caja.fecha)}
            </Text>
          </View>
          <Text className="text-xs font-medium text-slate-600 dark:text-slate-400" numberOfLines={1}>
            {caja?.concepto || 'Sin concepto'}
          </Text>
        </View>
      </View>

      {/* Right amount and payment type badge */}
      <View className="items-end">
        <Text
          className={`text-base font-black tracking-tight ${
            caja.tipo_mov === 'Ingreso'
              ? 'text-slate-900 dark:text-slate-100'
              : 'text-rose-600 dark:text-rose-400'
          }`}
        >
          {caja.tipo_mov === 'Ingreso' ? '+' : '-'}${caja.tipo_mov !== 'Ingreso' ? (caja.debe || 0).toFixed(2) : (caja.haber || 0).toFixed(2)}
        </Text>
        <View className={`${styles.container} px-2 py-0.5 mt-1 rounded-full border`}>
          <Text className={`${styles.text} text-[9px] font-bold uppercase tracking-wider`}>
            {caja.tipo_importe || 'Efectivo'}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default memo(VentaItem);
