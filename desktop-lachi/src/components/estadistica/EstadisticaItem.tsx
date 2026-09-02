import { DetalleVenta } from '../../interface';

interface Props {
  item: DetalleVenta;
}

export const EstadisticaItem = ({ item }: Props) => {
  return (
    <tr className="hover:bg-slate-50/70 dark:hover:bg-zinc-800/40 transition-colors">
      <td className="px-4 py-3.5 font-mono font-bold text-slate-900 dark:text-zinc-100">{item.codigo_articulo}</td>
      <td className="px-4 py-3.5 font-medium text-slate-800 dark:text-zinc-200">{item.producto}</td>
      <td className="px-4 py-3.5 text-right font-mono text-slate-700 dark:text-zinc-300">{item.cantidad_art.toFixed(2)}</td>
      <td className="px-4 py-3.5 text-right font-mono text-slate-700 dark:text-zinc-300">{item.stock.toFixed(2)}</td>
      <td className={`px-4 py-3.5 text-right font-mono font-semibold ${item.stock - item.cantidad_art > 0 ? 'text-green-600 dark:text-green-600' : 'text-red-600 dark:text-red-600'}`}>
        {(item.stock - item.cantidad_art).toFixed(2)}
      </td>
      <td className="px-4 py-3.5 text-right font-mono font-medium text-slate-900 dark:text-zinc-100">
        {item.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}
      </td>
    </tr>
  );
};
