import { useProductoStore } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { BarcodeScanningResult, CameraView } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';

interface Props {
  onClose: () => void;
}

export default function CameraScan({ onClose }: Props) {
  const { setBuscador } = useProductoStore();
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);

  //Animacion del laser de escaneo
  const laserAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(laserAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(laserAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    if (scanned) return;
    setScanned(true);

    Vibration.vibrate(80);

    setBuscador(data);
    onClose();
  };

  const translateY = laserAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View className="flex-1 bg-black justify-center relative">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['aztec', 'ean13', 'ean8', 'qr', 'pdf417', 'upc_e', 'datamatrix', 'code39', 'code93', 'itf14', 'codabar', 'code128', 'upc_a'],
        }}
      />
      {/* Capa de oscurecimiento superior */}
      <View className="absolute top-0 left-0 right-0 h-[28%] bg-black/60 items-center justify-center pt-10">
        <Text className="text-white text-lg font-bold text-center px-4">Apunta al código de barras del producto</Text>
        <Text className="text-slate-300 text-xs mt-1">Se detectará automáticamente</Text>
      </View>

      <View className="items-center justify-center">
        <View className="w-72 h-52 relative justify-center items-center">
          {/* Esquinas destacadas */}
          <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl" />
          <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl" />
          <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl" />
          <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-xl" />
          {/* Línea Láser animada */}
          <Animated.View
            style={{
              transform: [{ translateY }],
            }}
            className="w-full h-1 bg-emerald-400 shadow-lg shadow-emerald-500"
          />
        </View>
      </View>
      {/* Capa inferior con controles */}
      <View className="absolute bottom-0 left-0 right-0 h-[28%] bg-black/60 flex-row justify-around items-center px-6">
        {/* Botón Linterna */}
        <TouchableOpacity className={`p-4 rounded-full border ${torch ? 'bg-amber-400 border-amber-300' : 'bg-slate-800/80 border-slate-700'}`} onPress={() => setTorch(!torch)} activeOpacity={0.7}>
          <Ionicons name={torch ? 'flash' : 'flash-off-outline'} size={26} color={torch ? 'black' : 'white'} />
        </TouchableOpacity>
        {/* Botón Cancelar */}
        <TouchableOpacity className="bg-red-500/90 py-3.5 px-8 rounded-full shadow-lg flex-row items-center border border-red-600 active:bg-red-600" onPress={onClose} activeOpacity={0.8}>
          <Ionicons name="close-circle-outline" size={24} color="white" />
          <Text className="text-white font-bold ml-2 text-lg">Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
