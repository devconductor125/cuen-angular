import {Component} from '@angular/core';
import {DragAndDropComponent} from '../drag-and-drop/drag-and-drop.component';

@Component({
  selector: 'cuenca-drag-and-drop-ofac',
  templateUrl: './drag-and-drop-ofac.component.html',
  styleUrls: ['./drag-and-drop-ofac.component.css']
})
export class DragAndDropOfacComponent extends DragAndDropComponent {

  // subir archivos
  uploadFiles(): void {
    if (this.filesList && this.filesList.length > 0) {
      this.loadFilesButtom = true;
      this.cuencaVerdeService.makeFileRequest(this.taskId, this.filesList, this.onProgressUpdated.bind(this),
        'OFAC') // TODO get task id
        .then(success => {
          if (success) {
            this.progress = '0';
            this.notify.emit({id: this.getId(), payload: this.filesList});
            this.filesList = [];
            this.loadFilesButtom = false;
          } else {
            console.log('Error al cargar archivos');
          }
        });
    }
  }
}
