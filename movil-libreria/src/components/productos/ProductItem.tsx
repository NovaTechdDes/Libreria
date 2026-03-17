import { Producto } from "@/interface";
import { useProductoStore } from "@/store";
import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
  item: Producto;
}

export default function ProductItem({ item }: Props) {
  const hasImage = !!item.imagen;

  const { abrirModal, seleccionarProducto, buscador } = useProductoStore();

  const handleEdit = () => {
    seleccionarProducto(item);
    abrirModal();
  };

  if (
    buscador !== "" &&
    !item?.descripcion?.toLowerCase().includes(buscador.toLowerCase()) &&
    !item?.categoria?.toLowerCase().includes(buscador.toLowerCase()) &&
    !item?.marca?.toLowerCase().includes(buscador.toLowerCase()) &&
    !item?.id?.toString().toLowerCase().includes(buscador.toLowerCase())
  )
    return null;

  return (
    <View className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-4">
      <View className="flex-row p-3">
        {/* Imagen / Placeholder */}
        <View className="w-24 h-24 bg-slate-50 rounded-xl overflow-hidden items-center justify-center border border-slate-100">
          {hasImage ? (
            <Image
              source={{ uri: item.imagen }}
              className="w-full h-full"
              contentFit="cover"
              transition={200}
            />
          ) : (
            <View className="items-center justify-center">
              <Text className="text-slate-300 text-xs font-medium uppercase tracking-wider">
                Sin Imagen
              </Text>
            </View>
          )}
        </View>

        {/* Info */}
        <View className="flex-1 ml-4 justify-between">
          <View>
            <View className="flex-row justify-between items-start">
              <Text className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-widest mb-1">
                {item.categoria}
              </Text>
              <Text className="text-[10px] font-bold text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-widest mb-1">
                {item.id}
              </Text>
            </View>
            <Text
              className="text-base font-semibold text-slate-900 leading-tight"
              numberOfLines={2}
            >
              {item.descripcion}
            </Text>
            <Text className="text-xs text-slate-500 mt-1 font-medium">
              {item.marca}
            </Text>
          </View>

          <View className="flex-row justify-between items-end mt-2">
            <View>
              <Text className="text-xs text-slate-400 font-medium">Precio</Text>
              <Text className="text-lg font-bold text-slate-900">
                $
                {item.precio.toLocaleString("es-CL", {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </View>

            <View className="items-end">
              <View className="bg-emerald-50 px-2 py-1 rounded-md mb-1">
                <Text className="text-[10px] text-emerald-700 font-bold">
                  STOCK: {item.stock.toFixed(0)}
                </Text>
              </View>
              <Pressable
                className="bg-slate-900 px-4 py-1.5 rounded-lg active:bg-slate-700"
                onPress={handleEdit}
              >
                <Text className="text-white text-xs font-bold">Editar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
