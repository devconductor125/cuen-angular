import { Component, OnInit } from '@angular/core';
import {CuencaVerdeService} from '../../data/services/cuenca-verde.service';
import {BrowserUtils} from '../../data/utils/browser.utils';

@Component({
  selector: 'app-propertieslist',
  templateUrl: './propertieslist.component.html',
  styleUrls: ['./propertieslist.component.scss']
})
export class PropertieslistComponent implements OnInit {

  public arrProperties: Array<any> = [];
  public objStatus: Array<any> = [
    {
      'name': 'Seleccionar un estado',
      'value': '0'
    },
    {
      'name': 'Medir predio',
      'value': 'Medir predio'
    },
    {
      'name': 'Edición de medición',
      'value': 'Edición de medición'
    },
    {
      'name': 'Aprobar en validación',
      'value': 'Aprobar en validación'
    },
    {
      'name': 'Edición de validación',
      'value': 'Edición de validación'
    },
    {
      'name': 'Carga de certificado de tradición',
      'value': 'Carga de certificado de tradición'
    },
    {
      'name': 'Validar certificado de tradición',
      'value': 'Validar certificado de tradición'
    },
    {
      'name': 'Edición de validación con certificado de tradición',
      'value': 'Edición de validación con certificado de tradición'
    },
    {
      'name': 'Solicitud de edición de mapa en verificación',
      'value': 'Solicitud de edición de mapa en verificación'
    },
    {
      'name': 'Edicion SIG presupuesto, buenas prácticas',
      'value': 'Edicion SIG presupuesto, buenas prácticas'
    },
    {
      'name': 'Aprobar validación con actualización de sig',
      'value': 'Aprobar validación con actualización de sig'
    },
    {
      'name': 'Generación minuta coordinación guardacuencas',
      'value': 'Generación minuta coordinación guardacuencas'
    },
    {
      'name': 'Cargar mapa de verificación',
      'value': 'Cargar mapa de verificación'
    },
    {
      'name': 'Visualizacion minuta Direccion',
      'value': 'Visualizacion minuta Direccion'
    },
    {
      'name': 'Aprobación de presupuesto desde financiero',
      'value': 'Aprobación de presupuesto desde financiero'
    },
    {
      'name': 'Presupuesto rechazado desde financiero',
      'value': 'Presupuesto rechazado desde financiero'
    },
    {
      'name': 'Aprobación de presupuesto en financiero',
      'value': 'Aprobación de presupuesto en financiero'
    },
    {
      'name': 'Validacion minuta administrativo',
      'value': 'Validacion minuta administrativo'
    },
    {
      'name': 'Firma minuta propietario coordinador',
      'value': 'Firma minuta propietario coordinador'
    },
    {
      'name': 'Validacion minuta juridico',
      'value': 'Validacion minuta juridico'
    },
    {
      'name': 'Firma minuta propietario guarda cuenca o validacion',
      'value': 'Firma minuta propietario guarda cuenca o validacion'
    },
    {
      'name': 'Aprobación de dirección en presupuesto',
      'value': 'Aprobación de dirección en presupuesto'
    },
    {
      'name': 'Aprobación de dirección presupuesto',
      'value': 'Aprobación de dirección presupuesto'
    },
    {
      'name': 'Aprobación de financiero presupuesto',
      'value': 'Aprobación de financiero presupuesto'
    },
    {
      'name': 'Concepto de coordinación presupuesto',
      'value': 'Concepto de coordinación presupuesto'
    },
    {
      'name': 'Concepto de jurídico presupuesto',
      'value': 'Concepto de jurídico presupuesto'
    },
    {
      'name': 'Edicion SIG presupuesto, buenas prácticas',
      'value': 'Edicion SIG presupuesto, buenas prácticas'
    },
    {
      'name': 'Generación de minuta coordinación precontractual',
      'value': 'Generación de minuta coordinación precontractual'
    },
    {
      'name': 'Validacion minuta firmada por direccion y propietario coordinador',
      'value': 'Validacion minuta firmada por direccion y propietario coordinador'
    },
    {
      'name': 'Cargar minuta firmada por propietario',
      'value': 'Cargar minuta firmada por propietario'
    },
    {
      'name': 'Minuta firmada por dirección y presupuesto',
      'value': 'Minuta firmada por dirección y presupuesto'
    },
    {
      'name': 'Por contratar',
      'value': 'Por contratar'
    },
    {
      'name': 'Contratado',
      'value': 'Contratado'
    },
    {
      'name': 'En ejecución',
      'value': 'En ejecución'
    },
    {
      'name': 'Ejecutado',
      'value': 'Ejecutado'
    },
    {
      'name': 'Documentos del predio han sido aprobados',
      'value': 'Documentos del predio han sido aprobados'
    }
  ];
  public objFilter: object = {
    'id': 0,
    'name': null,
    'status': '0'
  };

  constructor(private cuencaServices: CuencaVerdeService) {
  }

  ngOnInit() {
    this.getProperties();
  }

  private getProperties(): void {
    this.cuencaServices.getProperties(this.objFilter)
      .then((properties: Array<any>) => {
        this.arrProperties = [];
        this.arrProperties = properties;
      });
  }

  public getDataWhitFilter() {
    this.getProperties();
  }

  public downloadExcel() {
    this.cuencaServices.getExcelProperties().then(
      (response) => {
        BrowserUtils.downloadAnyFromBlob(response, 'Lista de predios', 'xls');
      }
    );
  }

}
