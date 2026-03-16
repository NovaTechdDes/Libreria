import ModalProducto from "@/components/ModalProducto";
import BuscadorProductos from "@/components/productos/BuscadorProductos";
import ProductItem from "@/components/productos/ProductItem";
import { productos } from "@/data/productos";
import { useProductoStore } from "@/store";
import React from "react";
import { FlatList, View } from "react-native";

export default function HomeScreen() {
  const { modal } = useProductoStore();

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Buscador */}

      <BuscadorProductos />

      {/* tarjetas */}

      <View className="flex-1">
        <FlatList
          data={productos}
          className="mt-5"
          renderItem={({ item }) => <ProductItem key={item.id} item={item} />}
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
      </View>

      {/* modal */}
      {modal && <ModalProducto />}
    </View>
  );
}
