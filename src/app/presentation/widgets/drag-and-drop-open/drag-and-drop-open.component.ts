import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';

@Component({
  selector: 'cuenca-drag-and-drop-open',
  templateUrl: './drag-and-drop-open.component.html',
  styleUrls: ['./drag-and-drop-open.component.css']
})
export class DragAndDropOpenComponent extends BaseComponent {

  @Input() public taskId: string;
  @Input() public typeFile: string;

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
  }

  onFileInvalids(fileList: Array<File>) {
  }

  uploadFiles() {
    if (this.filesList && this.filesList.length > 0) {
      this.loadFilesButtom = true;
      this.cuencaVerdeService.makeFileRequestOpenTask(this.taskId, this.filesList, this.onProgressUpdated.bind(this), this.typeFile) // TODO get task id
        .then(success => {
          if (success) {
            this.progress = '0';
            this.notify.emit({payload: '1'});
            this.filesList = [];
            this.loadFilesButtom = false;
          } else {
            this.notify.emit({payload: '2'});
            console.log('Error al cargar archivos');
          }
        });
    }
  }

  removeItem(index: number) {
    ////alert('Index ' + index);
    this.filesList.splice(index, 1);
  }

  onProgressUpdated(value: number) {
    this.progress = String(value);
  }
}
