# Ejecutar build para probar en tablet android

1. `npx expo prebuild`
2. Ejecutar `npx expo run:android`

# Verificar que no hay errores

1. `npx expo-doctor`
2. `npx expo install --check`

# Subir a produccion Android

1. ejecutar `eas build:configure`
2. ejecutar `eas build --platform android --profile preview`

# Subir a produccion a IOS

1. ejecutar `eas build --platform ios --profile production`
2. ejecutar `eas submit -p ios --profile production`
3. Seleccionar `Select a build from EAS`
4. Elejimos cual subir (Por lo general el ultimo).
5. Generar el apy key automaticamente

# Subir Actualizacion

1. Ejecutar `eas update --channel preview --message ""`
