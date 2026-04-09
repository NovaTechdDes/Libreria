import { useMutateProducto } from '@/hooks/productos/useMutateProducto';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useProductoStore, useUsuarioStore } from '@/store';
import { mensaje } from '@/utils/mensaje';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  servidor: boolean;
}

export default function ModalProducto({ servidor }: Props) {
  const { isDark, colors } = useAppTheme();

  const { modal, cerrarModal, productoSeleccionado } = useProductoStore();
  const { setClave } = useUsuarioStore();
  const { modificarProducto } = useMutateProducto();
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    if (productoSeleccionado) {
      setPrecio(productoSeleccionado.precio.toString());
      setStock(productoSeleccionado.stock.toString());
    }
  }, [productoSeleccionado]);

  const handlePut = async () => {
    const res = await modificarProducto.mutateAsync({
      producto: {
        codigo: productoSeleccionado?.codigo,
        id: productoSeleccionado?.id,
        precio: Number(precio),
        stock: Number(stock),
      },
      servidor,
    });
    if (res) {
      await mensaje('success', 'Producto actualizado', 'Se guardaron los cambios correctamente');
    } else {
      await mensaje('error', 'Error al actualizar', 'No se pudieron guardar los cambios');
    }
    cerrarModal();
    setClave('');
  };

  if (!productoSeleccionado) return null;

  const handleClose = () => {
    cerrarModal();
    setClave('');
  };

  return (
    <Modal visible={modal} transparent animationType="fade" onRequestClose={handleClose}>
      <View className="flex-1 bg-slate-900/40 dark:bg-black/60 justify-end mb-10">
        <Pressable className="flex-1" onPress={handleClose} />

        <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={20} keyboardShouldPersistTaps="handled">
          <View className="bg-white dark:bg-slate-900 rounded-t-[32px] p-6 shadow-2xl">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
              <View className="flex-1">
                <Text className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">Editar Inventario</Text>
                <Text className="text-xl font-bold text-slate-900 dark:text-slate-100" numberOfLines={1}>
                  {productoSeleccionado.descripcion}
                </Text>
              </View>
              <Pressable onPress={handleClose} className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full active:bg-slate-200 dark:active:bg-slate-700">
                <Ionicons name="close" size={20} color={colors.icon} />
              </Pressable>
            </View>

            {/* Form */}
            <View className="gap-5">
              <View>
                <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 ml-1">PRECIO (CLP)</Text>
                <View className="flex-row items-center bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3">
                  <Text className="text-slate-400 dark:text-slate-500 font-bold mr-2">$</Text>
                  <TextInput
                    value={precio}
                    onChangeText={setPrecio}
                    keyboardType="numeric"
                    className="flex-1 text-slate-900 dark:text-slate-100 font-semibold text-base"
                    placeholder="0.00"
                    placeholderTextColor={colors.placeholder}
                  />
                </View>
              </View>

              <View>
                <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 ml-1">STOCK DISPONIBLE</Text>
                <View className="flex-row items-center bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3">
                  <Ionicons name="cube-outline" size={18} color={colors.icon} style={{ marginRight: 8 }} />
                  <TextInput
                    value={stock}
                    onChangeText={setStock}
                    keyboardType="numeric"
                    className="flex-1 text-slate-900 dark:text-slate-100 font-semibold text-base"
                    placeholder="0"
                    placeholderTextColor={colors.placeholder}
                  />
                </View>
              </View>
            </View>

            {/* Footer / Actions */}
            <View className="flex-row gap-3 mt-8 mb-2">
              <Pressable onPress={handleClose} className="flex-1 bg-slate-100 dark:bg-slate-800 py-4 rounded-2xl active:bg-slate-200 dark:active:bg-slate-700">
                <Text className="text-slate-600 dark:text-slate-300 font-bold text-center">Cancelar</Text>
              </Pressable>
              <Pressable onPress={handlePut} className="flex-[2] bg-blue-900 dark:bg-blue-700 py-4 rounded-2xl active:bg-blue-700 dark:active:bg-blue-600">
                <Text className="text-white font-bold text-center">Guardar Cambios</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
}
