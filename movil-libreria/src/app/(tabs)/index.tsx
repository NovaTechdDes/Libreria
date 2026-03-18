import ModalProducto from "@/components/ModalProducto";
import BuscadorProductos from "@/components/productos/BuscadorProductos";
import ProductItem from "@/components/productos/ProductItem";
import { Loading } from "@/components/ui/Loading";
import { useProductos } from "@/hooks/productos/useProductos";
import { useProductoStore } from "@/store";
import React from "react";
import { FlatList, View } from "react-native";

export default function HomeScreen() {
  const { modal, buscador } = useProductoStore();
  const { data: productos, isLoading } = useProductos(buscador);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Buscador */}

      <BuscadorProductos />

      {/* tarjetas */}

      <View className="flex-1">
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={productos}
            className="mt-5"
            renderItem={({ item }) => <ProductItem key={item.id} item={item} />}
            ItemSeparatorComponent={() => <View className="h-4" />}
          />
        )}
      </View>

      {/* modal */}
      {modal && <ModalProducto />}

      {/* Pantalla de carga */}
      {isLoading && <Loading />}
    </View>
  );
}
