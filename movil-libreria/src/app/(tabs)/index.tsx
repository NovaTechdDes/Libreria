import { getUsuarioByClave } from "@/actions";
import ModalProducto from "@/components/ModalProducto";

import BuscadorProductos from "@/components/productos/BuscadorProductos";
import CameraScan from "@/components/productos/CameraScan";
import ProductItem from "@/components/productos/ProductItem";
import { Loading } from "@/components/ui/Loading";
import ModalGetUsuario from "@/components/usuarios/ModalGetUsuario";
import { useProductos } from "@/hooks/productos/useProductos";
import { useUsuarioByClave } from "@/hooks/usuarios/useUsuarioByClave";
import { useProductoStore, useUsuarioStore } from "@/store";
import { mensaje } from "@/utils/mensaje";
import { useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

export default function HomeScreen() {
  const { modal, buscador, abrirModal } = useProductoStore();
  const { clave, setClave } = useUsuarioStore();

  const { data: productos, isLoading, refetch } = useProductos(buscador);
  const {
    data: usuario,
    isLoading: isLoadingUsuario,
  } = useUsuarioByClave(clave);

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
    const data = await getUsuarioByClave(nuevaClave);

    if (!nuevaClave) return;
    if (!data) {
      mensaje("error", "Usuario no encontrado", "");
      return;
    }

    if (data?.administrador) {
      abrirModal();
      setIsUserModalVisible(false);
    } else {
      mensaje("error", "No tienes permiso para realizar esta acción", "");
    }

    setIsUserModalVisible(false);
  };

  return (
    <View className="flex-1 bg-gray-100 dark:bg-slate-950 p-4">
      {/* tarjetas */}
      <FlatList
        data={productos}
        className="mt-5"
        renderItem={({ item }) => (
          <ProductItem
            setIsUserModalVisible={setIsUserModalVisible}
            key={item.id}
            item={item}
          />
        )}
        ListHeaderComponent={<BuscadorProductos handleScan={handleScan} />}
        ItemSeparatorComponent={() => <View className="h-4" />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={isLoading ? <Loading /> : null}
      />

      {/* modal */}
      {modal && <ModalProducto />}
      <ModalGetUsuario
        visible={isUserModalVisible}
        onClose={() => setIsUserModalVisible(false)}
        onConfirm={handleGetUser}
        isLoadingUsuario={isLoadingUsuario}
      />
    </View>
  );
}
