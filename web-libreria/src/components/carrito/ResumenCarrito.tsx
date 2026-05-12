'use client';

import { createClient } from '@/src/lib/client';
import { useCarritoStore } from '@/src/store/carrito.store';
import { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';

export const ResumenCarrito = () => {
  const { total, subtotal, productos, setHabilitado, setDescuento, setFrase, descuento, frase } = useCarritoStore();

  const [nombre, setNombre] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [notas, setNotas] = useState('');
  const [envio, setEnvio] = useState<boolean>(false);

  const cargarConfiguracion = async () => {
    const supabase = await createClient();
    const { data: configuracion, error } = await supabase.from('configuracion').select('*').single();

    if (error) {
      console.error('Error al obtener la configuración:', error);
      return null;
    }

    setHabilitado(configuracion.carrito_habilitado);
    setFrase(configuracion.frase_descuento);
    setDescuento(configuracion.porcentaje_descuento);
  };

  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const handleSendWhatsApp = () => {
    if (!nombre.trim()) {
      alert('Por favor, ingresa tu nombre para continuar.');
      return;
    }

    const productsList = productos
      .map((p) => {
        const colorInfo = p.color ? ` (Color: *${p.color.color}*)` : '';
        return `• *${p.cantidad}x* ${p.producto.descripcion}${colorInfo}`;
      })
      .join('\n');

    const totalFormateado = total.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
    });

    const mensajeWhatsApp = [
      '- *NUEVO PEDIDO - LIBRERIA Y JUGUETERIA LACHI*',
      '------------------------------',
      `- *Cliente:* ${nombre}`,
      `- *WhatsApp:* ${whatsapp || 'No especificado'}`,
      `- *Entrega:* ${envio ? 'Envío a domicilio' : 'Retiro en tienda'}`,
      '',
      '- *PRODUCTOS:*',
      productsList,
      '',
      notas ? `📝 *NOTAS:* ${notas}\n` : '',
      '------------------------------',
      `💰 *TOTAL: ${totalFormateado}*`,
      '------------------------------',
    ].join('\n');

    const phoneNumber = '5493456414401';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensajeWhatsApp)}`;

    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="border-b border-slate-100 pb-4 -mx-6 px-6">
        <h2 className="text-xl font-bold text-slate-900">Resumen de Pedido</h2>
      </header>

      {/* Precios */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-medium">Subtotal</span>
          <span className="text-slate-900 font-bold">${subtotal.toLocaleString('es-AR')}</span>
        </div>

        {frase && descuento && (
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">{frase}</span>
            <span className="text-slate-900 font-bold">{descuento}%</span>
          </div>
        )}

        <div className="flex justify-between items-center py-2">
          <span className="text-slate-900 text-xl font-bold">Total</span>
          <span className="text-teal-600 text-2xl font-extrabold tracking-tight">${total.toLocaleString('es-AR')}</span>
        </div>
      </div>

      {/* Formulario */}
      <form className="space-y-4 pt-2">
        <div className="space-y-1.5">
          <label className="text-slate-900 text-sm font-bold block">Nombre Completo</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Juan Pérez"
            className="w-full bg-white border border-slate-500 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-slate-900 text-sm font-bold block">WhatsApp del Cliente</label>
          <input
            type="text"
            name="whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="Ej: +54 9 11 1234 5678"
            className="w-full bg-white border border-slate-500 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-slate-900 text-sm font-bold block">Notas adicionales</label>
          <textarea
            name="notas"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Instrucciones de entrega, envoltorio de regalo, etc..."
            rows={3}
            className="w-full bg-white border border-slate-500 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm resize-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="envio" className="text-slate-900 text-sm font-bold block">
            Modalidad de envío
          </label>
          <select
            name="envio"
            id="envio"
            value={envio.toString()}
            onChange={(e) => setEnvio(e.target.value === 'true')}
            className="w-full bg-white border border-slate-500 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm"
          >
            <option value="false">Retiro en tienda</option>
            <option value="true">Envío a domicilio</option>
          </select>
        </div>

        {/* Botón de Acción */}
        <button
          onClick={handleSendWhatsApp}
          className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <FiSend className="w-5 h-5 fill-current" />
          Enviar Pedido por WhatsApp
        </button>
      </form>
    </div>
  );
};
