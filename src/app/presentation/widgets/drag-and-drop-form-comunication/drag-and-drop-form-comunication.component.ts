import {Component, EventEmitter, Output} from '@angular/core';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';

@Component({
  selector: 'cuenca-drag-and-drop-form-comunication',
  templateUrl: './drag-and-drop-form-comunication.component.html',
  styleUrls: ['./drag-and-drop-form-comunication.component.css']
})
export class DragAndDropFormComunicationComponent extends BaseComponent {

  @Output() notify: EventEmitter<object> = new EventEmitter<object>();
  public filesList: Array<File> = [];
  public filesRepetidos: Array<File> = [];
  public filesListTemp: Array<File> = [];
  public invalidFiles: Array<File> = [];
  public progress = '0';
  public loadFilesButtom = false;
  public coincidencia = false;

  public commentAnexo: string;

  constructor(protected proceduresManager: ProceduresManager,
              public cuencaVerdeService: CuencaVerdeService,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  onFilesChange(dropfilesList: Array<File>) {
    this.filesRepetidos = [];
    dropfilesList.forEach(function (file) {
      this.coincidencia = false;
      this.filesList.forEach(function (arrayFile) {
        ///alert(file.name + ' ' + arrayFile.name);
        /////COMPARACION
        if (file.name === arrayFile.name && file.size === arrayFile.size) {
          this.coincidencia = true;
        }
      }, this);
      if (!this.coincidencia) {
        this.filesListTemp.push(file);
      } else {
        this.filesRepetidos.push(file);
      }
    }, this);
    this.filesListTemp.forEach(function (file) {
      this.filesList.push(file);
    }, this);
    this.filesListTemp = [];
    this.notify.emit({payload: this.filesList});
  }

  onFileInvalids(fileList: Array<File>) {
  }

  removeItem(index: number) {
    ////alert('Index ' + index);
    this.filesList.splice(index, 1);
    this.notify.emit({payload: this.filesList});
  }

  onProgressUpdated(value: number) {
    this.progress = String(value);
  }

  reset() {
    this.filesList = [];
    this.filesRepetidos = [];
    this.filesListTemp = [];
    this.invalidFiles = [];
    this.progress = '0';
    this.loadFilesButtom = false;
    this.coincidencia = false;
  }
}
