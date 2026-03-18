CREATE VIEW api_articulos AS
SELECT
id_articulo
codigo,
descripcion,
precio,
cantidad,
marca,
rubro_tempo
FROM articulos
