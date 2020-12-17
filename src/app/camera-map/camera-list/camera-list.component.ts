import { Observable                                     } from 'rxjs'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Camera                                         } from '@common/models/camera.model'
import { CameraMapService                               } from '@common/services/camera-map.service'

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
  // ======================================= //
  constructor(private mapService: CameraMapService) { }
  ngOnInit() { this.cameraList$ = this.mapService.cameraList$; }
  // ======================================= //
  public onSelection(id: number) {
    this.selection = this.mapService.getCameraById(id);
    this.selectionChange.emit(this.selection);
  }
}
