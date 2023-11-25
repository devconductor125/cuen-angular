import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {GeoJsonService} from '../../data/services/geo-json.service';
import {BaseComponent} from '../base-component/base-component';
import {ProceduresManager} from '../../data/managers/procedures.manager';
import {RolesManager} from '../../data/managers/roles.manager';
import {debug} from 'util';

@Component({
  selector: 'cuenca-shape-uploader-properties',
  templateUrl: './shape-files-uploader-properties.component.html',
  styleUrls: ['./shape-files-uploader-properties.component.css']
})
export class ShapeFilesUploaderPropertiesComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() notify: EventEmitter<object> = new EventEmitter<object>();
  private shapeFileUploader = 'shapeFileUploader';
  private fileList: Array<any> = [];
  private fileInput: HTMLInputElement;

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
  }

  reset(): void {
    this.fileInput.value = null;
  }

  setFileList(fileList: any) {
    this.fileList = fileList;
  }

  uploadFiles() {
    this.notify.emit({id: this.shapeFileUploader, payload: {}, type: 'uploading'});
    if (this.fileList.length > 0) {


      Array.from(this.fileList).forEach((file: File) => {
        this.geoJsonService.shapeToGeoJson(file)
          .then((response: object) => {
            this.notify.emit({id: this.shapeFileUploader, payload: response, type: 'filesUploaded'});
          });
      });


    }
  }

}
