import { useState } from "react";
import { Login } from "../components/ui/Login";
import { useUserStore } from "../store";
import { ServerSetup } from "../pages";

const RootLayout = () => {
  const { usuario } = useUserStore();

  const [hasServerURL, setHasServerURL] = useState(false);

  if (!hasServerURL) {
    return <ServerSetup onConfigured={() => setHasServerURL(true)} />;
  }

  if (!usuario) return <Login />;

  return <div>RootLayout</div>;
};

export default RootLayout;
