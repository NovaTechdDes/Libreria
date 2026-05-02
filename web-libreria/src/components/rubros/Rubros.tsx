"use client";
import React, { useState } from "react";

const rubros = [
  { id: 1, nombre: "Todos" },
  { id: 2, nombre: "Librería" },
  { id: 3, nombre: "Juguetería" },
  { id: 4, nombre: "Cotillón" },
  { id: 5, nombre: "Kiosco" },
  { id: 6, nombre: "Impresiones" },
  { id: 7, nombre: "Folletos" },
  { id: 8, nombre: "Art. Escolares" },
];

export const Rubros = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <div className="w-full py-4 px-2">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-proximity">
        {rubros.map((rubro) => (
          <button
            key={rubro.id}
            onClick={() => setActiveId(rubro.id)}
            className={`
              flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 snap-start
              ${
                activeId === rubro.id
                  ? "bg-secondary text-white shadow-md scale-105"
                  : "bg-white text-secondary border border-gray-100 hover:border-primary hover:text-primary hover:bg-primary/5 shadow-sm"
              }
              active:scale-95
            `}
          >
            {rubro.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};
