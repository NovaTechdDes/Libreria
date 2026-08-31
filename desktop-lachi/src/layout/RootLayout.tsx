import { Login } from "../components/ui/Login"
import { useUserStore } from "../store";


const RootLayout = () => {

  const { usuario } = useUserStore()

  if(!usuario) return <Login/>

  return <div>RootLayout</div>;
};

export default RootLayout;
