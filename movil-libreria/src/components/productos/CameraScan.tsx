import { useProductoStore } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';

interface Props {
  onClose: () => void;
}

export default function CameraScan({ onClose }: Props) {
  const { setBuscador } = useProductoStore();
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  // Animación del láser de escaneo
  const laserAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
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
    );
    animation.start();

    return () => animation.stop();
  }, [laserAnim]);

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    if (scanned) return;
    setScanned(true);

    // Feedback háptico (vibración física)
    Vibration.vibrate(80);

    setBuscador(data);
    onClose();
  };

  const translateY = laserAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 190],
  });

  // Pantalla de carga mientras se verifican permisos
  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  // Si no hay permisos concedidos
  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.permissionText}>Se requiere acceso a la cámara</Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.btnText}>Conceder Permiso</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.permissionBtn, { marginTop: 12, backgroundColor: '#475569' }]} onPress={onClose}>
          <Text style={styles.btnText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        enableTorch={torch}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['aztec', 'ean13', 'ean8', 'qr', 'pdf417', 'upc_e', 'datamatrix', 'code39', 'code93', 'itf14', 'codabar', 'code128', 'upc_a'],
        }}
      >
        {/* Capa de máscara que enmarca la mirilla de escaneo */}
        <View style={styles.overlayContainer}>
          {/* 1. Máscara superior oscura */}
          <View style={styles.topMask}>
            <Text style={styles.headerTitle}>Apunta al código de barras</Text>
            <Text style={styles.headerSubtitle}>Se detectará automáticamente</Text>
          </View>

          {/* 2. Fila central: Izquierda oscura | Centro Transparente (Mirilla) | Derecha oscura */}
          <View style={styles.middleRow}>
            <View style={styles.sideMask} />

            {/* Mirilla transparente donde se ve la cámara */}
            <View style={styles.viewFinder}>
              {/* Esquinas redondeadas luminosas */}
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />

              {/* Láser animado */}
              <Animated.View style={[styles.laser, { transform: [{ translateY }] }]} />
            </View>

            <View style={styles.sideMask} />
          </View>

          {/* 3. Máscara inferior oscura con controles */}
          <View style={styles.bottomMask}>
            {/* Botón Linterna */}
            <TouchableOpacity style={[styles.torchBtn, torch && styles.torchBtnActive]} onPress={() => setTorch((prev) => !prev)} activeOpacity={0.7}>
              <Ionicons name={torch ? 'flash' : 'flash-off-outline'} size={24} color={torch ? '#000000' : '#ffffff'} />
            </TouchableOpacity>

            {/* Botón Cancelar */}
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.8}>
              <Ionicons name="close-circle-outline" size={22} color="#ffffff" />
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  permissionText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  permissionBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topMask: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#cbd5e1',
    fontSize: 12,
    marginTop: 4,
  },
  middleRow: {
    height: 220,
    flexDirection: 'row',
  },
  sideMask: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  viewFinder: {
    width: 280,
    height: 220,
    position: 'relative',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: '#34d399',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },
  laser: {
    width: '100%',
    height: 2,
    backgroundColor: '#34d399',
    shadowColor: '#34d399',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 4,
  },
  bottomMask: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  torchBtn: {
    padding: 14,
    borderRadius: 9999,
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    borderWidth: 1,
    borderColor: '#334155',
  },
  torchBtnActive: {
    backgroundColor: '#fbbf24',
    borderColor: '#f59e0b',
  },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  cancelText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});
