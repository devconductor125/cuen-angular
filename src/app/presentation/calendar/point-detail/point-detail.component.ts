import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {InfoPoint} from '../../../data/model/infoPoint';
import Comments = commentsInterface.Comments;

@Component({
  selector: 'cuenca-point-detail-monitoring',
  templateUrl: './point-detail.component.html',
  styleUrls: ['./point-detail.component.css']
})
export class PointDetailComponent extends BaseComponent implements OnInit {

  @Input() public point: InfoPoint;
  public URL_IMG: string;

  public comments: Array<Comments>;

  ///// @Output() notify: EventEmitter<object> = new EventEmitter<object>();

  constructor(protected proceduresManager: ProceduresManager,
              public cuencaService: CuencaVerdeService,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.URL_IMG = this.cuencaService.API_IMAGES_URL_CUENCA;

    this.comments = this.point.comments;

    // console.log(this.point);
  }

  public popUpImage(imagen: any) {

    // modal
    const modal = document.getElementById('myModal');

    // obtener imagen y setear
    const modalImg = document.getElementById('img01') as HTMLImageElement;

    const captionText = document.getElementById('caption');

      modal.style.display = 'block';
      modalImg.src = this.URL_IMG + imagen.name;
      ////captionText.innerHTML = 'Caption Example';

  }

  public closeModal() {
    // modal
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }

}
