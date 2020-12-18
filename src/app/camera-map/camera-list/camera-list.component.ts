import { Observable } from 'rxjs'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Camera } from '@common/models/camera.model'
import { CameraMapService } from '@common/services/camera-map.service'
import { CameraFormService } from '@common/services/camera-form.service';
import { AbstractControl, FormGroup } from '@angular/forms';

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
  public cameraList$: Observable<Camera[]>;
  public cameraForm: FormGroup;
  // ======================================= //
  constructor(private mapService: CameraMapService, private formService: CameraFormService) { }
  ngOnInit() {
    this.cameraList$ = this.mapService.cameraList$;
    this.resetCamera();
  }
  // ======================================= //
  public submitCamera() {
    this.mapService.addCamera(this.cameraForm.value);
    this.resetCamera()
  }
  public resetCamera() {
    this.cameraForm = this.formService.createForm();
  }
  public onSelection(id: number) {
    this.selection = this.mapService.getCameraById(id);
    this.selectionChange.emit(this.selection);
  }
  public validInput(control: AbstractControl) {
    return control.touched && control.invalid;
  }
}
