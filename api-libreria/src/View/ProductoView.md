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

ALTER VIEW api_articuloss AS  
SELECT  
    a.id_articulo,  
    a.codigo,  
    a.descripcion,  
    a.precio,  
    a.cantidad,  
    a.marca,  
    a.rubro_tempo,  
    a.id_rubro,  
    a.activo,  
    (  
        SELECT  
            g.id_rubro_g AS [rubro_g.id_rubro_g],  
            g.nom_rubro_g AS [rubro_g.nom_rubro_g],
            s.id_rubro AS [sub_rubro.id_rubro],
            s.nom_rubro AS [sub_rubro.nom_rubro]
        FROM dbo.rubros s  
        LEFT JOIN dbo.rubros_generales g ON s.id_rubro_g = g.id_rubro_g
        WHERE s.id_rubro = a.id_rubro  
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER  
    ) AS rubro  
FROM dbo.articulos a;
