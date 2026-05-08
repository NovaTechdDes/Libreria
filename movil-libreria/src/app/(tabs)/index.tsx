import { getUsuarioByClave } from '@/actions';
import ModalProducto from '@/components/ModalProducto';

import BuscadorProductos from '@/components/productos/BuscadorProductos';
import CameraScan from '@/components/productos/CameraScan';
import ProductItem from '@/components/productos/ProductItem';
import { Loading } from '@/components/ui/Loading';
import SelectModal from '@/components/ui/SelectedModal';
import ModalGetUsuario from '@/components/usuarios/ModalGetUsuario';
import { useRubros } from '@/hooks';
import { useProductos } from '@/hooks/productos/useProductos';
import { Rubro, SubRubro } from '@/interface';
import { useProductoStore } from '@/store';
import { useGlobalStore } from '@/store/globalStore';
import { mensaje } from '@/utils/mensaje';
import { Ionicons } from '@expo/vector-icons';
import { useCameraPermissions } from 'expo-camera';
import React, { useMemo, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, RefreshControl, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { servidor, setServidor, setUsuario } = useGlobalStore();
  const { modal, buscador, abrirModal, rubroSeleccionado, seleccionarRubro, subRubroSeleccionado, seleccionarSubRubro } = useProductoStore();

  const { data: productos, isLoading, refetch } = useProductos(buscador, servidor, rubroSeleccionado, subRubroSeleccionado);
  const { data, isLoading: isLoadingRubros, refetch: refetchRubros } = useRubros(servidor);

  const [refreshing, setRefreshing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  const [visibleRubro, setVisibleRubro] = useState(false);
  const [visibleSubRubro, setVisibleSubRubro] = useState(false);

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

  const rubrosConTodos: Rubro[] = (data?.rubros?.length ?? 0) > 0 ? [{ id_rubro: 0, nombre_rubro: 'Todos' }, ...(data?.rubros ?? [])] : [];
  const subRubrosConTodos: SubRubro[] = useMemo(() => {
    if (!data?.subRubros?.length) return [];

    const filtrados = data.subRubros.filter((subRubro) => subRubro.id_rubro_g === rubroSeleccionado);

    return [{ id_rubro: 0, nombre_rubro: 'Todos' }, ...filtrados];
  }, [data?.subRubros, rubroSeleccionado]);
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
          <TouchableOpacity
            onPress={() => setVisibleRubro(true)}
            className="bg-white dark:bg-slate-900 border border-neutral-100 dark:border-neutral-800 px-4 py-2 rounded-2xl flex-row items-center justify-between"
          >
            <View className="flex-1">
              <Text className="text-[8px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest ">Rubro</Text>
              <Text className={'font-bold text-base ' + (rubroSeleccionado ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400 dark:text-neutral-600')}>
                {rubrosConTodos.find((rubro) => rubro.id_rubro === rubroSeleccionado)?.nombre_rubro || 'Todos'}
              </Text>
            </View>
            <Ionicons name="pricetag-outline" size={18} color={isDarkMode ? 'white' : 'black'} />
          </TouchableOpacity>
        )}

        {showSubRubros && rubroSeleccionado !== null && (
          <TouchableOpacity
            onPress={() => setVisibleSubRubro(true)}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-2 rounded-2xl flex-row items-center justify-between"
          >
            <View className="flex-1">
              <Text className="text-[8px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest ">SubRubro</Text>
              <Text className={'font-bold text-base ' + (subRubroSeleccionado ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400 dark:text-neutral-600')}>
                {subRubrosConTodos.find((rubro) => rubro.id_rubro === subRubroSeleccionado)?.nombre_rubro || 'Todos'}
              </Text>
            </View>
            <Ionicons name="list-outline" size={18} color={isDarkMode ? 'white' : 'black'} />
          </TouchableOpacity>
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
      <SelectModal title="Seleccionar Rubro" data={rubrosConTodos} visible={visibleRubro} onSelect={(item) => seleccionarRubro(item.id_rubro)} onClose={() => setVisibleRubro(false)} />
      <SelectModal title="Seleccionar SubRubro" data={subRubrosConTodos} visible={visibleSubRubro} onSelect={(item) => seleccionarSubRubro(item.id_rubro)} onClose={() => setVisibleSubRubro(false)} />
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

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 8,
  },
  containerStyle: {
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
