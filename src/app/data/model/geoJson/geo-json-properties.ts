export class GeoJsonProperties {
  private Acciones: string;
  private OBJECTID: number;
  private Observacio: string;
  private Pol: string;
  private SHAPE_Area: number;
  private Shape_Leng: number;

  setAcciones(Acciones: string) {
    this.Acciones = Acciones;
  }

  setObjectId(OBJECTID: number) {
    this.OBJECTID = OBJECTID;
  }

  getObjectId() {
    return this.OBJECTID;
  }

  setObservations(Observacio: string) {
    this.Observacio = Observacio;
  }

  setPolygon(Pol: string) {
    this.Pol = Pol;
  }

  setShapeArea(SHAPE_Area: number) {
    this.SHAPE_Area = SHAPE_Area;
  }

  setShapeLength(Shape_Leng: number) {
    this.Shape_Leng = Shape_Leng;
  }
}
