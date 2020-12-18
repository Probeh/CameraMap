import { Observable } from 'rxjs'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CameraEvent } from '@common/models/camera-event.model'
import { Camera } from '@common/models/camera.model'
import { CameraMapService } from '@common/services/camera-map.service'

@Component({
  selector: 'app-camera-events',
  templateUrl: './camera-events.component.html',
  styleUrls: ['./camera-events.component.scss']
})
export class CameraEventsComponent implements OnInit {
  // ======================================= //
  @Input() public set currentCamera(camera: Camera) { this.onCameraChanged(camera); }
  @Input() public set currentEvent(event: CameraEvent) { this.onEventChanged(event); }
  @Output() public currentEventChange: EventEmitter<CameraEvent> = new EventEmitter();
  // ======================================= //
  public camera: Camera;
  public cameraEvent: CameraEvent;
  public cameraEvents$: Observable<CameraEvent[]>;
  // ======================================= //
  constructor(private mapService: CameraMapService) { }
  ngOnInit() { this.cameraEvents$ = this.mapService.eventsList$; }
  // ======================================= //
  public refreshEventList() {
    this.mapService.refreshEvents(this.camera);
  }
  public onCameraChanged(camera: Camera) {
    this.camera = camera;
    this.mapService.getCameraEvents(camera);
  }
  public onEventChanged(event: CameraEvent) {
    this.cameraEvent = event;
    this.currentEventChange.emit(event);
  }
}
