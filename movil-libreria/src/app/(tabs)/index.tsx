import { getUsuarioByClave } from '@/actions';
import ModalProducto from '@/components/ModalProducto';

import BuscadorProductos from '@/components/productos/BuscadorProductos';
import CameraScan from '@/components/productos/CameraScan';
import ProductItem from '@/components/productos/ProductItem';
import { Loading } from '@/components/ui/Loading';
import ModalGetUsuario from '@/components/usuarios/ModalGetUsuario';
import { useProductos } from '@/hooks/productos/useProductos';
import { useUsuarioByClave } from '@/hooks/usuarios/useUsuarioByClave';
import { useProductoStore, useUsuarioStore } from '@/store';
import { useGlobalStore } from '@/store/globalStore';
import { mensaje } from '@/utils/mensaje';
import { useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, RefreshControl, Text, View } from 'react-native';

export default function HomeScreen() {
  const { servidor } = useGlobalStore();
  const { modal, buscador, abrirModal } = useProductoStore();
  const { clave, setClave } = useUsuarioStore();

  const { data: productos, isLoading, refetch } = useProductos(buscador, servidor);
  const { data: usuario, isLoading: isLoadingUsuario } = useUsuarioByClave(clave, servidor);

  const [refreshing, setRefreshing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();

  const handleScan = () => {
    if (!permission?.granted) {
      requestPermission();
    } else {
      setIsScanning(true);
    }
  };

  if (isScanning) {
    return <CameraScan onClose={() => setIsScanning(false)} />;
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleGetUser = async (nuevaClave: string) => {
    setClave(nuevaClave);
    const data = await getUsuarioByClave(nuevaClave, servidor);

    if (!nuevaClave) return;
    if (!data) {
      mensaje('error', 'Usuario no encontrado', '');
      return;
    }

    if (data?.administrador) {
      abrirModal();
      setIsUserModalVisible(false);
    } else {
      mensaje('error', 'No tienes permiso para realizar esta acción', '');
    }

    setIsUserModalVisible(false);
  };

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={100} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-gray-100 dark:bg-slate-950 p-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-bold dark:text-white text-black">Productos</Text>

        <Text className={`text-2xl font-bold ${servidor ? 'text-red-500' : 'text-green-500'}`}>{servidor ? 'Remoto' : 'Local'}</Text>
      </View>

      {/* tarjetas */}
      <FlatList
        data={productos}
        className="mt-5"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductItem setIsUserModalVisible={setIsUserModalVisible} item={item} />}
        ListHeaderComponent={<BuscadorProductos handleScan={handleScan} />}
        ItemSeparatorComponent={() => <View className="h-4" />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={isLoading ? <Loading /> : null}
        contentContainerStyle={{ paddingBottom: 250 }}
        keyboardShouldPersistTaps="handled"
      />

      {/* modal */}
      {modal && <ModalProducto servidor={servidor} />}
      <ModalGetUsuario visible={isUserModalVisible} onClose={() => setIsUserModalVisible(false)} onConfirm={handleGetUser} isLoadingUsuario={isLoadingUsuario} />
    </KeyboardAvoidingView>
  );
}
