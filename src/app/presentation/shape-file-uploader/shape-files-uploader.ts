import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {GeoJsonService} from '../../data/services/geo-json.service';
import {BaseComponent} from '../base-component/base-component';
import {ProceduresManager} from '../../data/managers/procedures.manager';
import {RolesManager} from '../../data/managers/roles.manager';

@Component({
  selector: 'cuenca-shape-uploader',
  templateUrl: './shape-files-uploader.component.html',
  styleUrls: ['./shape-files-uploader.component.css']
})
export class ShapeFilesUploaderComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() notify: EventEmitter<object> = new EventEmitter<object>();
  private shapeFileUploader = 'shapeFileUploader';
  private fileList: any;
  private fileInput: HTMLInputElement;
  public filesNamesList = [];

  constructor(protected proceduresManager: ProceduresManager,
              private geoJsonService: GeoJsonService,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  onChange(event: any, fileInput: HTMLInputElement) {
    this.fileList = event.target.files;
    this.fileInput = fileInput;
    this.filesNamesList = [];
    for (let i = 0; i < this.fileInput.files.length; i++) {
      this.filesNamesList.push(this.fileInput.files[i].name + (i < this.fileInput.files.length - 1 ? ' | ' : ''));
    }
  }

  public reset(): void {
    this.fileInput.value = null;
    this.fileList = [];
    this.filesNamesList = [];
  }

  setFileList(fileList: FileList) {
    this.fileList = fileList;
  }

  uploadFiles() {
    this.notify.emit({id: this.shapeFileUploader, payload: {}, type: 'uploading'});
    if (this.fileList && this.fileList.length > 0) {
      Array.from(this.fileList).forEach((file: File) => {
        this.geoJsonService.shapeToGeoJson(file)
          .then((response: object) => {
            this.notify.emit({id: this.shapeFileUploader, payload: response, type: 'filesUploaded'});
          });
      });
    }
  }
}
