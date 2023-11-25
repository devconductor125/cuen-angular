declare module geoJsonInterface {

  export interface Geometry {
    coordinates: any[];
    type: string;
  }

  export interface Properties {
    Acciones: string;
    feature_type: string;
    OBJECTID: number;
    ID_PREDIO: string;
    NOMBRE_PRE: string;
    CUENCA: string;
    COD_MUNICI: string;
    MUNICIPIO: string;
    VEREDA: string;
    POLIGONO: string;
    ACCIONES: string;
    ACCIONES_P: string;
    ICA_NFS: number;
    Area_inter: number;
    Interpreta: string;
    Estado: string;
    TIPO_RESTA: string;
    BOSQUE: string;
    FECHA_REPO: string;
    Shape_Leng: number;
    Shape_Area: number;
    PROYECTO_O: string;
    TIPO_ALAMBRE: string;
    TIPO_ALAMB: string;
    TIPO_CERCO_VIVO: string;
    LONGITUD_M: number;
    AREA_HA: number;
    SHAPE_Leng: number;
    SHAPE_Area: number;
    AccionId: string;
    Accion: string;
    Material: string;
    MaterialId: string;
    Pol?: any;
    Color: string;
    FillColor: string;
    hash: string;
  }

  export interface Feature {
    geometry: Geometry;
    properties: Properties;
    type: string;
  }

  export interface GeoJson {
    budget: any;
    crs?: any;
    features: Feature[];
    last_added_feature?: any;
    multi_line_string_features: Feature[];
    polygon_features: Feature[];
    multi_polygon_features: Feature[];
    point_features: Feature[];
    type: string;
  }
}
