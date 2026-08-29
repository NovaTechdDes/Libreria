import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import '../../global.css';

const queryClient = new QueryClient();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  const toastConfig = {
    success: (props: any) => <BaseToast {...props} text1NumberOfLines={0} text2NumberOfLines={0} style={{ borderLeftColor: '#10b981', height: 'auto', minHeight: 60, paddingVertical: 10 }} />,
    error: (props: any) => <ErrorToast {...props} text1NumberOfLines={0} text2NumberOfLines={0} style={{ borderLeftColor: '#ef4444', height: 'auto', minHeight: 60, paddingVertical: 10 }} />,
    info: (props: any) => <BaseToast {...props} text1NumberOfLines={0} text2NumberOfLines={0} style={{ borderLeftColor: '#3b82f6', height: 'auto', minHeight: 60, paddingVertical: 10 }} />,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-950">
        <QueryClientProvider client={queryClient}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </QueryClientProvider>
      </SafeAreaView>
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}
