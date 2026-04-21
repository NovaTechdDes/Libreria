CREATE VIEW api_articuloss AS
SELECT
id_articulo
codigo,
descripcion,
precio,
cantidad,
marca,
rubro_tempo
FROM articulos

ALTER VIEW api_articuloss AS
SELECT
id_articulo,
codigo,
descripcion,
precio,
cantidad,
marca,
rubro_tempo,
activo
FROM dbo.articulos;
