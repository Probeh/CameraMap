import { Observable } from 'rxjs'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Camera } from '@common/models/camera.model'
import { CameraFormService } from '@common/services/camera-form.service'
import { CameraMapService } from '@common/services/camera-map.service'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-camera-list',
  templateUrl: './camera-list.component.html',
  styleUrls: ['./camera-list.component.scss']
})
export class CameraListComponent implements OnInit {
  // ======================================= //
  @Input() public currentCamera: Camera;
  @Output() public currentCameraChange: EventEmitter<Camera> = new EventEmitter();
  // ======================================= //
  public cameraList$: Observable<Camera[]>;
  public cameraForm: FormGroup;
  // ======================================= //
  constructor(private mapService: CameraMapService, private formService: CameraFormService) { }
  ngOnInit() {
    this.cameraList$ = this.mapService.cameraList$;
    this.cameraForm = this.formService.createForm();
  }
  // ======================================= //
  public onSelection(camera: Camera) {
    this.currentCamera = camera;
    this.currentCameraChange.emit(this.currentCamera);
  }
  public addCamera(camera: Camera = this.cameraForm.value) {
    this.mapService.addCamera(camera);
  }
}
