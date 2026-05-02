import React from "react";

const rubrps = [
  {
    id: 1,
    nombre: "Todos",
  },
  {
    id: 2,
    nombre: "Libreria",
  },
  {
    id: 3,
    nombre: "Jugueteria",
  },
  {
    id: 4,
    nombre: "Cotillon",
  },
  {
    id: 5,
    nombre: "Kiosco",
  },
  {
    id: 6,
    nombre: "Impresiones",
  },
  {
    id: 7,
    nombre: "Folletos",
  },
  {
    id: 8,
    nombre: "Art. Escolares",
  },
];

export const Rubros = () => {
  return (
    <div className="flex gap-5">
      {rubrps.map((rubro) => (
        <div
          key={rubro.id}
          className="text-center bg-secondary text-white p-2 rounded-xl cursor-pointer hover:bg-primary transition-colors"
        >
          <h3 className="font-bold text-sm">{rubro.nombre}</h3>
        </div>
      ))}
    </div>
  );
};
