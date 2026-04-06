import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Keyboard, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface ModalGetUsuarioProps {
  visible: boolean;
  onClose: () => void;
  onConfirm?: (clave: string) => void;
  isLoadingUsuario?: boolean;
}

export default function ModalGetUsuario({ visible, onClose, onConfirm, isLoadingUsuario }: ModalGetUsuarioProps) {
  const [clave, setClave] = React.useState('');
  const { isDark, colors } = useAppTheme();

  const handleConfirm = () => {
    if (!clave) return;

    // Cerramos el teclado manualmente para evitar interferencias
    Keyboard.dismiss();

    if (onConfirm) {
      onConfirm(clave);
    }
    setClave('');
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-slate-900/60 dark:bg-black/80 justify-center items-center p-6">
        {/* Backdrop Pressable */}
        <Pressable className="absolute inset-0" onPress={onClose} />

        <View className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
          {/* Header Icon */}
          <View className="items-center mb-6">
            <View className="bg-blue-100 dark:bg-blue-900/30 p-5 rounded-full mb-4 shadow-sm">
              <Ionicons name="lock-closed" size={32} color={colors.accent} />
            </View>
            <Text className="text-2xl font-bold text-slate-900 dark:text-white text-center">Acceso Requerido</Text>
            <Text className="text-slate-500 dark:text-slate-400 text-center mt-2 px-4 leading-5">Por favor ingrese su clave de seguridad para continuar.</Text>
          </View>

          <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={20} keyboardShouldPersistTaps="always" contentContainerStyle={{ paddingBottom: 10 }}>
            <View className="gap-6">
              <View>
                <Text className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-2 ml-1 uppercase tracking-[2px]">Clave de Seguridad</Text>
                <View className="flex-row items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-4">
                  <Ionicons name="key-outline" size={20} color={colors.icon} style={{ marginRight: 12 }} />
                  <TextInput
                    placeholder="Ingrese su clave"
                    placeholderTextColor={colors.placeholder}
                    value={clave}
                    onChangeText={setClave}
                    secureTextEntry
                    returnKeyType="done"
                    onSubmitEditing={handleConfirm}
                    autoFocus={true}
                    className="flex-1 text-slate-900 dark:text-white font-semibold text-lg"
                  />
                </View>
              </View>

              {/* Actions */}
              <View className="flex-row gap-3 mt-4">
                <Pressable onPress={onClose} className="flex-1 bg-slate-100 dark:bg-slate-800 py-4 rounded-2xl active:bg-slate-200 dark:active:bg-slate-700 transition-colors">
                  <Text className="text-slate-600 dark:text-slate-300 font-bold text-center">Cancelar</Text>
                </Pressable>
                <Pressable
                  onPress={handleConfirm}
                  disabled={!clave}
                  className={`flex-[1.5] py-4 rounded-2xl active:opacity-90 shadow-md ${clave ? 'bg-blue-600 dark:bg-blue-700 shadow-blue-500/30' : 'bg-slate-200 dark:bg-slate-700 opacity-50'}`}
                >
                  <Text className="text-black dark:text-white font-bold text-center">{isLoadingUsuario ? 'Cargando...' : 'Ingresar'}</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Modal>
  );
}
