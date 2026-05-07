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
import { Rubro } from '@/interface';
import { useProductoStore } from '@/store';
import { useGlobalStore } from '@/store/globalStore';
import { mensaje } from '@/utils/mensaje';
import { useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, RefreshControl, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

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
          <Dropdown
            style={[
              styles.dropdown,
              {
                backgroundColor: isDarkMode ? '#0f172a' : 'white',
                borderColor: isDarkMode ? '#1e293b' : '#e2e8f0',
              },
              servidor && { backgroundColor: isDarkMode ? '#450a0a' : '#fef2f2' }, // Tinte rojo si es remoto
            ]}
            placeholderStyle={[styles.placeholderStyle, isDarkMode && { color: '#64748b' }]}
            selectedTextStyle={[styles.selectedTextStyle, isDarkMode && { color: '#f1f5f9' }]}
            inputSearchStyle={[styles.inputSearchStyle, isDarkMode && { backgroundColor: '#1e293b', color: '#f1f5f9' }]}
            containerStyle={[styles.containerStyle, isDarkMode && { backgroundColor: '#0f172a', borderColor: '#1e293b' }]}
            activeColor={isDarkMode ? '#1e293b' : '#eff6ff'}
            data={rubrosConTodos}
            search
            maxHeight={300}
            labelField="nombre_rubro"
            valueField="id_rubro"
            placeholder="Seleccionar rubro"
            searchPlaceholder="Buscar rubro..."
            value={rubroSeleccionado}
            onChange={(item) => seleccionarRubro(item.id_rubro)}
            renderItem={(item) => (
              <View className="flex-row justify-between items-center p-4 border-b border-slate-100 dark:border-slate-800">
                <Text className={`text-base ${item.id_rubro === rubroSeleccionado ? 'text-blue-500 font-bold' : 'text-slate-700 dark:text-slate-200'}`}>
                  {item.nombre_rubro}
                </Text>
                {item.id_rubro === rubroSeleccionado && <View className="w-2 h-2 rounded-full bg-blue-500" />}
              </View>
            )}
          />
        )}
        {showSubRubros && rubroSeleccionado !== null && (
          <Dropdown
            style={[
              styles.dropdown,
              {
                backgroundColor: isDarkMode ? '#0f172a' : 'white',
                borderColor: isDarkMode ? '#1e293b' : '#e2e8f0',
              },
            ]}
            placeholderStyle={[styles.placeholderStyle, isDarkMode && { color: '#64748b' }]}
            selectedTextStyle={[styles.selectedTextStyle, isDarkMode && { color: '#f1f5f9' }]}
            inputSearchStyle={[styles.inputSearchStyle, isDarkMode && { backgroundColor: '#1e293b', color: '#f1f5f9' }]}
            containerStyle={[styles.containerStyle, isDarkMode && { backgroundColor: '#0f172a', borderColor: '#1e293b' }]}
            activeColor={isDarkMode ? '#1e293b' : '#eff6ff'}
            data={subRubrosConTodos}
            search
            maxHeight={300}
            labelField="nombre_rubro"
            valueField="id_rubro"
            placeholder="Seleccionar subrubro"
            searchPlaceholder="Buscar subrubro..."
            value={subRubroSeleccionado}
            onChange={(item) => seleccionarSubRubro(item.id_rubro)}
            renderItem={(item) => (
              <View className="flex-row justify-between items-center p-4 border-b border-slate-100 dark:border-slate-800">
                <Text className={`text-base ${item.id_rubro === subRubroSeleccionado ? 'text-indigo-500 font-bold' : 'text-slate-700 dark:text-slate-200'}`}>
                  {item.nombre_rubro}
                </Text>
                {item.id_rubro === subRubroSeleccionado && <View className="w-2 h-2 rounded-full bg-indigo-500" />}
              </View>
            )}
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
