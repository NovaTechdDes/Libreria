import { getUsuarioByClave } from '@/actions';
import { vales } from '@/data/vales';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useUsuarioByClave } from '@/hooks/usuarios/useUsuarioByClave';
import { useUsuarioStore } from '@/store';
import { mensaje } from '@/utils/mensaje';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import ModalGetUsuario from '../usuarios/ModalGetUsuario';

export default function Vales() {
  const [mostrar, setMostrar] = useState<boolean>(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const { clave, setClave } = useUsuarioStore();
  const { data: usuario, isLoading: isLoadingUsuario } = useUsuarioByClave(clave);
  const { isDark, colors } = useAppTheme();

  const handleGetUser = async (nuevaClave: string) => {
    setClave(nuevaClave);
    const data = await getUsuarioByClave(nuevaClave);

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

  useEffect(() => {}, [usuario, clave]);

  return (
    <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 mb-8">
      {/* Total */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-gray-400 dark:text-slate-500 font-medium uppercase tracking-wider text-xs">Total del dia</Text>

        <Pressable onPress={handleMostrar}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons name={mostrar ? 'eye-off-outline' : 'eye-outline'} size={30} color={isDark ? '#34d399' : '#059669'} />
          </Animated.View>
        </Pressable>
      </View>

      <Text className="text-4xl font-black text-gray-900 dark:text-slate-100 mb-6">{mostrar ? `$${vales.total.toFixed(2)}` : '-'}</Text>
      <View className="space-y-4">
        {/* Row: Efectivo */}
        <View className="flex-row justify-between items-center py-3 border-b border-gray-50 dark:border-slate-800">
          <View className="flex-row items-center gap-3">
            <View className="bg-emerald-100 dark:bg-emerald-900/40 p-2.5 rounded-2xl">
              <Ionicons name="cash-outline" size={20} color={isDark ? '#34d399' : '#059669'} />
            </View>
            <Text className="text-gray-700 dark:text-slate-300 font-semibold text-base">Efectivo</Text>
          </View>

          <Text className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">{mostrar ? `$${vales.efectivo.toFixed(2)}` : '-'}</Text>
        </View>

        {/* Row: Debito */}
        <View className="flex-row justify-between items-center py-3 border-b border-gray-50 dark:border-slate-800">
          <View className="flex-row items-center gap-3">
            <View className="bg-blue-100 dark:bg-blue-900/40 p-2.5 rounded-2xl">
              <Ionicons name="card-outline" size={20} color={isDark ? '#60a5fa' : '#2563eb'} />
            </View>
            <Text className="text-gray-700 dark:text-slate-300 font-semibold text-base">T. Débito</Text>
          </View>
          <Text className="text-blue-600 dark:text-blue-400 font-bold text-lg">{mostrar ? `$${vales.debito.toFixed(2)}` : '-'}</Text>
        </View>

        {/* Row: Credito */}
        <View className="flex-row justify-between items-center py-3">
          <View className="flex-row items-center gap-3">
            <View className="bg-violet-100 dark:bg-violet-900/40 p-2.5 rounded-2xl">
              <Ionicons name="card-outline" size={20} color={isDark ? '#a78bfa' : '#7c3aed'} />
            </View>
            <Text className="text-gray-700 dark:text-slate-300 font-semibold text-base">T. Crédito</Text>
          </View>
          <Text className="text-violet-600 dark:text-violet-400 font-bold text-lg">{mostrar ? `$${vales.credito.toFixed(2)}` : '-'}</Text>
        </View>
      </View>

      <ModalGetUsuario visible={isUserModalVisible} onClose={() => setIsUserModalVisible(false)} onConfirm={handleGetUser} isLoadingUsuario={isLoadingUsuario} />
    </View>
  );
}
