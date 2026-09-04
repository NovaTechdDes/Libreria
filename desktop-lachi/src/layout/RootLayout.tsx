import { useEffect, useState } from 'react';
import { Login } from '../components/ui/Login';
import { useUserStore } from '../store';
import { ServerSetup } from '../pages';
import { Outlet } from 'react-router-dom';
import AsideBar from '../components/ui/AsideBar';
import { getServerUrl, initAppStore } from '../service';

const RootLayout = () => {
  const { usuario } = useUserStore();

  const [loadingConfig, setLoadingConfig] = useState(true);
  const [hasServerURL, setHasServerURL] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkConfiguration = async () => {
      try {
        const savedUrl = await initAppStore();
        const url = savedUrl || getServerUrl();

        if (url && url.trim() !== '') {
          if (isMounted) setHasServerURL(true);
        } else {
          if (isMounted) setHasServerURL(false);
        }
      } catch (error) {
        console.error('Error inicializando la configuración:', error);
        if (isMounted) setHasServerURL(false);
      } finally {
        if (isMounted) setLoadingConfig(false);
      }
    };

    checkConfiguration();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loadingConfig) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-100/80 dark:bg-[#111113]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!hasServerURL) {
    return <ServerSetup onConfigured={() => setHasServerURL(true)} />;
  }

  if (!usuario) return <Login />;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100/70 dark:bg-[#111113]">
      <AsideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
