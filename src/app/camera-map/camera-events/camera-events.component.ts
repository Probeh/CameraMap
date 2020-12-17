import { Observable               } from 'rxjs'
import { Component, Input, OnInit } from '@angular/core'
import { CameraEvent              } from '@common/models/camera-event.model'
import { Camera                   } from '@common/models/camera.model'
import { CameraMapService         } from '@common/services/camera-map.service'

@Component({
  selector: 'app-camera-events',
  templateUrl: './camera-events.component.html',
  styleUrls: ['./camera-events.component.scss']
})
export class CameraEventsComponent implements OnInit {
  // ======================================= //
  @Input() public set selection(value: Camera) { this.onSelection(value); }
  // ======================================= //
  public camera: Camera;
  public cameraEvents$: Observable<CameraEvent[]>;
  // ======================================= //
  constructor(private mapService: CameraMapService) { }
  ngOnInit() { this.cameraEvents$ = this.mapService.eventsList$; }
  // ======================================= //
  public onSelection(camera: Camera) {
    this.camera = camera;
    this.mapService.getCameraEvents(camera);
  }
}
