import { BarcodeScanningResult, CameraView } from "expo-camera";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useProductoStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onClose: () => void;
}

export default function CameraScan({ onClose }: Props) {
  const { setBuscador } = useProductoStore();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    if (scanned) return;
    setScanned(true);
    setBuscador(data);
    onClose();
  };

  return (
    <View className="flex-1 bg-black justify-center relative">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
            "aztec",
            "ean13",
            "ean8",
            "qr",
            "pdf417",
            "upc_e",
            "datamatrix",
            "code39",
            "code93",
            "itf14",
            "codabar",
            "code128",
            "upc_a",
          ],
        }}
      />
      <View className="absolute bottom-16 left-0 right-0 flex-row justify-center items-center">
        <TouchableOpacity
          className="bg-red-500/90 py-3 px-8 rounded-full shadow-lg flex-row items-center border border-red-600"
          onPress={onClose}
        >
          <Ionicons name="close-circle-outline" size={24} color="white" />
          <Text className="text-white font-bold ml-2 text-lg">Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
