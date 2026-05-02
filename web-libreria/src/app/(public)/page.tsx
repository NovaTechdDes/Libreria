import { Productos } from "@/src/components/Productos/Productos";
import { Rubros } from "@/src/components/rubros/Rubros";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center pt-5 bg-zinc-200 font-sans ">
      {/* Rubros */}
      <Rubros />

      {/* Productos */}
      <Productos />
    </div>
  );
}
