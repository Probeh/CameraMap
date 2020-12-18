import { Observable } from 'rxjs'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Camera } from '@common/models/camera.model'
import { CameraMapService } from '@common/services/camera-map.service'
import { CameraFormService } from '@common/services/camera-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-camera-list',
  templateUrl: './camera-list.component.html',
  styleUrls: ['./camera-list.component.scss']
})
export class CameraListComponent implements OnInit {
  // ======================================= //
  @Input() public selection: Camera;
  @Output() public selectionChange: EventEmitter<Camera> = new EventEmitter();
  // ======================================= //
  public collapsed: boolean = true;
  public cameraList$: Observable<Camera[]>;
  public cameraForm: FormGroup;
  // ======================================= //
  constructor(private mapService: CameraMapService, private formService: CameraFormService) { }
  ngOnInit() {
    this.cameraList$ = this.mapService.cameraList$;
    this.cameraForm = this.formService.initialize();
  }
  // ======================================= //
  public toggleForm() {
    const footer: HTMLElement = document.querySelector('.content-card-footer');
    const center: HTMLElement = footer.querySelector('.content-card-body');
    if (footer.classList.contains('collapsed')) {
      footer.classList.replace('collapsed', 'expanded');
      this.collapsed = false;
    }
    else {
      footer.classList.replace('expanded', 'collapsed');
      this.collapsed = true;
    }
  }
  public addCamera() {
    this.mapService.addCamera(this.cameraForm.value);
  }
  public onSelection(id: number) {
    this.selection = this.mapService.getCameraById(id);
    this.selectionChange.emit(this.selection);
  }
}
