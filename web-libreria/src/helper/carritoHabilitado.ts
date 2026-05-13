export const carritoHabilitado = (inicio: string, fin: string, habilitado: boolean) => {
  if (habilitado) return true;

  if (inicio && fin) {
    const comparacionFecha = new Date().toISOString().split('T')[0];
    return !(comparacionFecha <= fin && comparacionFecha >= inicio);
  }
};
