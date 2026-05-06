import { getUsuarioByClave } from '@/actions';
import ModalProducto from '@/components/ModalProducto';

import BuscadorProductos from '@/components/productos/BuscadorProductos';
import CameraScan from '@/components/productos/CameraScan';
import ProductItem from '@/components/productos/ProductItem';
import RubroItem from '@/components/rubros/RubroItem';
import SubRubroItem from '@/components/rubros/SubRubroItem';
import { Loading } from '@/components/ui/Loading';
import ModalGetUsuario from '@/components/usuarios/ModalGetUsuario';
import { useRubros } from '@/hooks';
import { useProductos } from '@/hooks/productos/useProductos';
import { useProductoStore } from '@/store';
import { useGlobalStore } from '@/store/globalStore';
import { mensaje } from '@/utils/mensaje';
import { useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, RefreshControl, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { servidor, setServidor, setUsuario } = useGlobalStore();
  const { modal, buscador, abrirModal, rubroSeleccionado, seleccionarRubro, subRubroSeleccionado, seleccionarSubRubro } = useProductoStore();

  const { data: productos, isLoading, refetch } = useProductos(buscador, servidor, rubroSeleccionado, subRubroSeleccionado);
  const { data, isLoading: isLoadingRubros, refetch: refetchRubros } = useRubros(servidor);

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
    await refetchRubros();
    setRefreshing(false);
  };

  const handleGetUser = async (nuevaClave: string) => {
    if (!nuevaClave) return;

    setUsuario(nuevaClave);

    const data = await getUsuarioByClave(nuevaClave, servidor);

    if (!data) {
      mensaje('error', 'Usuario no encontrado', '');
      setUsuario('');
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

  const handleServidor = () => {
    setServidor(!servidor);
  };

  if (!data && isLoadingRubros) {
    return <Loading />;
  }

  const rubrosConTodos = (data?.rubros?.length ?? 0) > 0 ? [{ id_rubro: null, nombre_rubro: 'Todos' }, ...(data?.rubros ?? [])] : [];
  const subRubrosConTodos =
    (data?.subRubros?.length ?? 0) > 0 ? [{ id_rubro: null, nombre_rubro: 'Todos' }, ...(data?.subRubros.filter((subRubro) => subRubro.id_rubro === rubroSeleccionado) ?? [])] : [];
  const showRubros = isLoadingRubros || rubrosConTodos.length > 0;
  const showSubRubros = isLoadingRubros || subRubrosConTodos.length > 0;

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={100} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-gray-100 dark:bg-slate-950 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold dark:text-white text-black">Productos</Text>

        <TouchableOpacity onPress={handleServidor}>
          <Text className={`text-lg font-bold ${servidor ? 'text-red-500' : 'text-green-500'}`}>{servidor ? 'Remoto' : 'Local'}</Text>
        </TouchableOpacity>
      </View>

      <View className="gap-5">
        {showRubros && (
          <FlatList
            data={rubrosConTodos}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => (item.id_rubro ? item.id_rubro.toString() : 'todos')}
            renderItem={({ item }) => <RubroItem item={item} isSelected={rubroSeleccionado === item.id_rubro} onPress={() => seleccionarRubro(item.id_rubro)} />}
            ItemSeparatorComponent={() => <View className="w-3" />}
            ListEmptyComponent={isLoadingRubros ? <Loading /> : null}
            contentContainerStyle={{ paddingRight: 20 }}
            keyboardShouldPersistTaps="handled"
            className="mb-1"
          />
        )}
        {showSubRubros && rubroSeleccionado !== null && (
          <FlatList
            data={subRubrosConTodos}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => (item.id_rubro ? item.id_rubro.toString() : 'todos')}
            renderItem={({ item }) => <SubRubroItem item={item} isSelected={subRubroSeleccionado === item.id_rubro} onPress={() => seleccionarSubRubro(item.id_rubro)} />}
            ItemSeparatorComponent={() => <View className="w-3" />}
            ListEmptyComponent={isLoadingRubros ? <Loading /> : null}
            contentContainerStyle={{ paddingRight: 20 }}
            keyboardShouldPersistTaps="handled"
            className="mb-1"
          />
        )}
      </View>

      {/* tarjetas */}
      <FlatList
        data={productos}
        className={showRubros ? 'mt-2' : 'mt-0'}
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
      <ModalGetUsuario
        visible={isUserModalVisible}
        onClose={() => {
          setIsUserModalVisible(false);
          setUsuario('');
        }}
        onConfirm={handleGetUser}
      />
    </KeyboardAvoidingView>
  );
}
