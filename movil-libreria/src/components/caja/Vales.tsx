import { getUsuarioByClave } from '@/actions';
import { useMutateCaja } from '@/hooks/caja/useMutateCaja';
import { useVales } from '@/hooks/caja/useVales';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Vale } from '@/interface/Vale';
import { useGlobalStore } from '@/store/globalStore';
import { mensaje } from '@/utils/mensaje';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { Loading } from '../ui/Loading';
import ToastConfirmacion from '../ui/ToastConfirm';
import ModalGetUsuario from '../usuarios/ModalGetUsuario';
import ValeRow from './ValeRow';

export default function Vales() {
  const { servidor, setUsuario, usuario } = useGlobalStore();
  const { data: vales, isLoading: isLoadingVales, refetch } = useVales(servidor, usuario);

  const { isDark } = useAppTheme();
  const { postCierreCaja } = useMutateCaja();

  const [mostrar, setMostrar] = useState<boolean>(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const scaleCerrar = useRef(new Animated.Value(1)).current;

  const handleGetUser = async (nuevaClave: string) => {
    setUsuario(nuevaClave);
    const data = await getUsuarioByClave(nuevaClave, servidor);

    if (data?.administrador) {
      setMostrar(true);
      setIsUserModalVisible(false);
    } else {
      mensaje('error', 'No tienes permiso para realizar esta acción', '');
    }

    setIsUserModalVisible(false);
  };

  const handleMostrar = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (!mostrar) {
      setIsUserModalVisible(true);
    } else {
      setMostrar(false);
    }
  };

  const handleCerrarCaja = async () => {
    Animated.sequence([
      Animated.timing(scaleCerrar, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleCerrar, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    const data = await postCierreCaja.mutateAsync({ servidor, usuario });
    if (data) {
      mensaje('success', 'Caja cerrada correctamente', '');
    } else {
      mensaje('error', 'Error al cerrar caja', '');
    }

    setIsConfirmModalVisible(false);
  };

  if (isLoadingVales) return <Loading message="Cargando datos" />;

  return (
    <View className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800/80">
      {/* Header & Toggle */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center gap-2">
          <View className="w-2 h-2 rounded-full bg-emerald-500" />
          <Text className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px]">Total en Caja</Text>
        </View>

        <Pressable 
          onPress={handleMostrar}
          className="p-1.5 rounded-full active:bg-slate-100 dark:active:bg-slate-800"
          hitSlop={8}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons name={mostrar ? 'eye-off-outline' : 'eye-outline'} size={22} color={isDark ? '#34d399' : '#059669'} />
          </Animated.View>
        </Pressable>
      </View>

      {/* Main Balance Display */}
      <View className="mb-5">
        <Text className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {mostrar ? `$${vales?.reduce((acc: number, vale: Vale) => acc + (vale.saldo || 0), 0)?.toFixed(2)}` : '••••••'}
        </Text>
      </View>

      {/* Breakdown Rows */}
      <View className="divide-y divide-slate-100 dark:divide-slate-800/60 border-t border-slate-100 dark:border-slate-800/60 pt-1">
        {vales?.map((vale: Vale) => (
          <ValeRow key={vale.tipo_importe} vale={vale} mostrar={mostrar} />
        ))}
      </View>

      {/* Action: Cierre de caja */}
      {mostrar && (
        <View className="mt-4 pt-2">
          <Pressable 
            onPress={() => setIsConfirmModalVisible(true)} 
            disabled={postCierreCaja.isPending} 
            className="bg-emerald-600 active:bg-emerald-700 dark:bg-emerald-600 dark:active:bg-emerald-500 py-3.5 px-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm"
          >
            <Animated.View style={{ transform: [{ scale: scaleCerrar }] }} className="flex-row items-center gap-2">
              <Ionicons name="lock-closed-outline" size={18} color="#ffffff" />
              <Text className="text-white font-bold text-sm tracking-wide">
                {postCierreCaja.isPending ? 'Cerrando caja...' : 'Cierre de caja'}
              </Text>
            </Animated.View>
          </Pressable>
        </View>
      )}

      <ModalGetUsuario
        visible={isUserModalVisible}
        onClose={() => {
          setIsUserModalVisible(false);
          setUsuario('');
        }}
        onConfirm={handleGetUser}
      />

      <ToastConfirmacion 
        visible={isConfirmModalVisible} 
        mensaje="¿Estás seguro de que deseas cerrar la caja?" 
        onConfirm={handleCerrarCaja} 
        onCancel={() => setIsConfirmModalVisible(false)} 
      />
    </View>
  );
}
