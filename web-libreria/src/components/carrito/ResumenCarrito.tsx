"use client";

import React from "react";
import { useCarritoStore } from "@/src/store/carrito.store";
import { useState } from "react";
import { FiLock, FiSend } from "react-icons/fi";

export const ResumenCarrito = () => {
  const { total, productos } = useCarritoStore();

  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [notas, setNotas] = useState("");

  const handleSendWhatsApp = () => {
    // Lógica básica para abrir WhatsApp con el pedido
    const message = productos
      .map((p) => `- ${p.cantidad}x ${p.producto.descripcion}`)
      .join("\n");
    const totalMsg = `\n\nTotal: $${total.toLocaleString("es-AR")}`;
    const url = `https://wa.me/?text=${encodeURIComponent(
      "Hola, me gustaría realizar el siguiente pedido:\n\n" +
        message +
        totalMsg,
    )}`;
    window.open(url, "_blank");
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
          <span className="text-slate-900 font-bold">
            ${total.toLocaleString("es-AR")}
          </span>
        </div>

        <div className="flex justify-between items-center py-2">
          <span className="text-slate-900 text-xl font-bold">Total</span>
          <span className="text-teal-600 text-2xl font-extrabold tracking-tight">
            ${total.toLocaleString("es-AR")}
          </span>
        </div>
      </div>

      {/* Formulario */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1.5">
          <label className="text-slate-900 text-sm font-bold block">
            Nombre Completo
          </label>
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
          <label className="text-slate-900 text-sm font-bold block">
            WhatsApp del Cliente
          </label>
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
          <label className="text-slate-900 text-sm font-bold block">
            Notas adicionales
          </label>
          <textarea
            name="notas"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Instrucciones de entrega, envoltorio de regalo, etc..."
            rows={3}
            className="w-full bg-white border border-slate-500 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm resize-none"
          />
        </div>
      </div>

      {/* Botón de Acción */}
      <button
        onClick={handleSendWhatsApp}
        className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
      >
        <FiSend className="w-5 h-5 fill-current" />
        Enviar Pedido por WhatsApp
      </button>
    </div>
  );
};
