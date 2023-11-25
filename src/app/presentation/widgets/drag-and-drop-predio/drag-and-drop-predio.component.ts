import {Component} from '@angular/core';
import {DragAndDropComponent} from '../drag-and-drop/drag-and-drop.component';

@Component({
  selector: 'cuenca-drag-and-drop-predio',
  templateUrl: './drag-and-drop-predio.component.html',
  styleUrls: ['./drag-and-drop-predio.component.css']
})
export class DragAndDropPredioComponent extends DragAndDropComponent {

  uploadFiles(): void {
    if (this.filesList && this.filesList.length > 0) {
      this.loadFilesButtom = true;
      this.cuencaVerdeService.makeFileRequestPredio(this.idPredio, this.filesList, this.onProgressUpdated.bind(this),
        this.typeFile) // TODO get predio id
        .then(success => {
          if (success) {
            this.progress = '0';
            this.notify.emit({id: this.getId(), payload: {code: 200, type: this.typeFile, message: 'Archivo cargado satisfactoriamente'}});
            this.filesList = [];
            this.loadFilesButtom = false;
          } else {
            this.notify.emit({id: this.getId(), payload: {code: 500, type: this.typeFile, message: 'El archivo no pudo ser cargado'}});
          }
        });
    }
  }
}
