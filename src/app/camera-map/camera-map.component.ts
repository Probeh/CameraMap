import { Observable                                     } from 'rxjs'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CameraEvent                                    } from '@common/models/camera-event.model'
import { Camera                                         } from '@common/models/camera.model'
import { CameraMapService, GoogleMap                    } from '@common/services/camera-map.service'

@Component({
  selector: 'app-camera-map',
  templateUrl: './camera-map.component.html',
  styleUrls: ['./camera-map.component.scss']
})
export class CameraMapComponent implements OnInit {
  // ======================================= //
  @Input() public set selection(value: Camera) { this.onSelectionInput(value); };
  @Output() public selectionChange: EventEmitter<Camera> = new EventEmitter();
  // ======================================= //
  public cameraList$: Observable<Camera[]>;
  public eventsList$: Observable<CameraEvent[]>;
  // ======================================= //
  public currentCam: Camera;
  public googleMaps: GoogleMap;
  // ======================================= //
  constructor(private mapService: CameraMapService) { }
  ngOnInit() {
    const element: HTMLElement = document.getElementById("map");
    this.mapService
      .loadMap(element)
      .then((result) => this.googleMaps = result);

    this.cameraList$ = this.mapService.cameraList$;
    this.eventsList$ = this.mapService.eventsList$;
  }
  // ======================================= //
  public onCameraSelection(id: number) {
    this.currentCam = this.mapService.getCameraById(id);
    this.selectionChange.emit(this.currentCam);
  }
  private onSelectionInput(camera: Camera) {
    /* TODO: Update the map to zoom on the current selection */
    this.currentCam = camera;
  }
}
