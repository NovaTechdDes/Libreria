import { useAppTheme } from '@/hooks/useAppTheme';
import { Vale } from '@/interface/Vale';
import { formatCurrency } from '@/utils/formatCurrency';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface Props {
  vale: Vale;
  mostrar: boolean;
}

export default function ValeRow({ vale, mostrar }: Props) {
  const { isDark } = useAppTheme();

  const getTipoInfo = (tipo: string) => {
    switch (tipo) {
      case 'Contado':
      case 'Efectivo':
        return {
          icon: 'cash-outline' as const,
          bg: isDark ? 'bg-emerald-950/50 border-emerald-900/40' : 'bg-emerald-50 border-emerald-100',
          color: isDark ? '#34d399' : '#059669',
        };
      case 'Débito':
        return {
          icon: 'card-outline' as const,
          bg: isDark ? 'bg-blue-950/50 border-blue-900/40' : 'bg-blue-50 border-blue-100',
          color: isDark ? '#60a5fa' : '#2563eb',
        };
      case 'Crédito':
        return {
          icon: 'card' as const,
          bg: isDark ? 'bg-violet-950/50 border-violet-900/40' : 'bg-violet-50 border-violet-100',
          color: isDark ? '#a78bfa' : '#7c3aed',
        };
      default:
        return {
          icon: 'wallet-outline' as const,
          bg: isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100',
          color: isDark ? '#94a3b8' : '#64748b',
        };
    }
  };

  const info = getTipoInfo(vale.tipo_importe);

  return (
    <View className="flex-row justify-between items-center py-3">
      <View className="flex-row items-center gap-3">
        <View className={`${info.bg} p-2 rounded-xl border`}>
          <Ionicons name={info.icon} size={18} color={info.color} />
        </View>
        <Text className="text-slate-700 dark:text-slate-300 font-semibold text-sm">{vale.tipo_importe}</Text>
      </View>

      <Text className="text-slate-900 dark:text-slate-100 font-bold text-base">{mostrar ? formatCurrency(vale.saldo || 0) : '••••'}</Text>
    </View>
  );
}
