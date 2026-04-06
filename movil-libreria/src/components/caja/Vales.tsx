import { getUsuarioByClave } from '@/actions';
import { useMutateCaja } from '@/hooks/caja/useMutateCaja';
import { useVales } from '@/hooks/caja/useVales';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useUsuarioByClave } from '@/hooks/usuarios/useUsuarioByClave';
import { Vale } from '@/interface/Vale';
import { useUsuarioStore } from '@/store';
import { useGlobalStore } from '@/store/globalStore';
import { mensaje } from '@/utils/mensaje';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Loading } from '../ui/Loading';
import ToastConfirmacion from '../ui/ToastConfirm';
import ModalGetUsuario from '../usuarios/ModalGetUsuario';
import ValedRow from './ValedRow';

export default function Vales() {
  const { servidor } = useGlobalStore();
  const { clave, setClave } = useUsuarioStore();
  const { data: usuario, isLoading: isLoadingUsuario } = useUsuarioByClave(clave);
  const { data: vales, isLoading: isLoadingVales } = useVales(servidor);

  const { isDark, colors } = useAppTheme();
  const { postCierreCaja } = useMutateCaja();

  const [mostrar, setMostrar] = useState<boolean>(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const scaleCerrar = useRef(new Animated.Value(1)).current;

  const handleGetUser = async (nuevaClave: string) => {
    setClave(nuevaClave);
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

    await Toast.show({
      type: 'success',
      text1: 'Caja cerrada correctamente',
    });

    const data = await postCierreCaja.mutateAsync(servidor);
    if (data) {
      mensaje('success', 'Caja cerrada correctamente', '');
    } else {
      mensaje('error', 'Error al cerrar caja', '');
    }

    setIsConfirmModalVisible(false);
  };

  useEffect(() => {}, [usuario, clave]);

  if (isLoadingVales) return <Loading message="Cargando datos" />;

  return (
    <View className="bg-white rounded-lg dark:bg-slate-900 p-6 shadow-sm border border-gray-100 dark:border-slate-800">
      {/* Total */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-gray-400 dark:text-slate-500 font-medium uppercase tracking-wider text-xs">Total del dia</Text>

        <Pressable onPress={handleMostrar}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons name={mostrar ? 'eye-off-outline' : 'eye-outline'} size={30} color={isDark ? '#34d399' : '#059669'} />
          </Animated.View>
        </Pressable>
      </View>

      <Text className="text-4xl font-black text-gray-900 dark:text-slate-100 mb-6">{mostrar ? `$${vales?.reduce((acc: number, vale: Vale) => acc + (vale.saldo || 0), 0)?.toFixed(2)}` : '-'}</Text>
      <View className="space-y-4">
        {vales?.map((vale: Vale) => (
          <ValedRow key={vale.tipo_importe} vale={vale} mostrar={mostrar} />
        ))}

        {/* Confirmar */}
        {mostrar && (
          <View className="mt-2">
            <Pressable onPress={() => setIsConfirmModalVisible(true)} disabled={postCierreCaja.isPending} className="bg-emerald-600 dark:bg-emerald-900/40 p-2.5 rounded-2xl">
              <Animated.View style={{ transform: [{ scale: scaleCerrar }] }}>
                <Text className="text-white dark:text-slate-100 font-bold text-lg text-center">{postCierreCaja.isPending ? 'Cerrando...' : 'Cierre de caja'}</Text>
              </Animated.View>
            </Pressable>
          </View>
        )}
      </View>

      <ModalGetUsuario visible={isUserModalVisible} onClose={() => setIsUserModalVisible(false)} onConfirm={handleGetUser} isLoadingUsuario={isLoadingUsuario} />

      <ToastConfirmacion visible={isConfirmModalVisible} mensaje="¿Estás seguro de que deseas cerrar la caja?" onConfirm={handleCerrarCaja} onCancel={() => setIsConfirmModalVisible(false)} />
    </View>
  );
}
