import {Component, Input} from '@angular/core';
import {DragAndDropComponent} from '../drag-and-drop/drag-and-drop.component';
import {BaseComponent} from '../../base-component/base-component';

@Component({
  selector: 'cuenca-drag-and-drop-contractor',
  templateUrl: './drag-and-drop-contractor.component.html',
  styleUrls: ['./drag-and-drop-contractor.component.css']
})
export class DragAndDropContractorComponent extends DragAndDropComponent {

  @Input() userId: string;

  public uploadFilesContractor() {
    if (this.filesList && this.filesList.length > 0) {
      this.loadFilesButtom = true;
      this.cuencaVerdeService.makeFileRequestContratista(this.userId, this.filesList, this.onProgressUpdated.bind(this), 'contractor')
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
