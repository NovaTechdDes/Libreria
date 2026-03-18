import ModalProducto from "@/components/ModalProducto";

import BuscadorProductos from "@/components/productos/BuscadorProductos";
import CameraScan from "@/components/productos/CameraScan";
import ProductItem from "@/components/productos/ProductItem";
import { Loading } from "@/components/ui/Loading";
import { useProductos } from "@/hooks/productos/useProductos";
import { useProductoStore } from "@/store";
import { useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

export default function HomeScreen() {
  const { modal, buscador } = useProductoStore();
  const { data: productos, isLoading, refetch } = useProductos(buscador);
  const [refreshing, setRefreshing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

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

  return (
    <View className="flex-1 bg-gray-100 dark:bg-slate-950 p-4">
      {/* tarjetas */}
      <FlatList
        data={productos}
        className="mt-5"
        renderItem={({ item }) => <ProductItem key={item.id} item={item} />}
        ListHeaderComponent={<BuscadorProductos handleScan={handleScan} />}
        ItemSeparatorComponent={() => <View className="h-4" />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={isLoading ? <Loading /> : null}
      />

      {/* modal */}
      {modal && <ModalProducto />}
    </View>
  );
}

