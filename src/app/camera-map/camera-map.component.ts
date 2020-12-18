import { Observable                                            } from 'rxjs'
import { Component       , EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CameraEvent                                           } from '@common/models/camera-event.model'
import { Camera                                                } from '@common/models/camera.model'
import { Geolocation                                           } from '@common/models/geolocation.model'
import { CameraMapService, GoogleMap, MapLatLng, MapMarker     } from '@common/services/camera-map.service'

@Component({
  selector: 'app-camera-map',
  templateUrl: './camera-map.component.html',
  styleUrls: ['./camera-map.component.scss']
})
export class CameraMapComponent implements OnInit {
  // ======================================= //
  @Input() public set currentCamera(camera: Camera) { this.onCameraChanged(camera); };
  @Input() public set currentEvent(event: CameraEvent) { this.onEventChanged(event); };
  @Output() public currentCameraChange: EventEmitter<Camera> = new EventEmitter();
  // ======================================= //
  public cameraList$: Observable<Camera[]>;
  public eventsList$: Observable<CameraEvent[]>;
  // ======================================= //
  public googleMaps: GoogleMap;
  public selectedCamera: Camera;
  public selectedEvent: CameraEvent;
  // ======================================= //
  constructor(private mapService: CameraMapService) { }
  ngOnInit() {
    const element: HTMLElement = document.getElementById("map");
    this.cameraList$ = this.mapService.cameraList$;
    this.eventsList$ = this.mapService.eventsList$;

    this.mapService
      .loadMap(element)
      .then((result) => this.googleMaps = result)
      .then(() => this.cameraList$.subscribe({ next: (result) => this.showCameras(result) }));

  }
  // ======================================= //
  private showCameras(cameras: Camera[]) {
    for (let index = 0; index < cameras.length; index++) {
      setTimeout(() => {
        const element = cameras[index];
        const iconSize: number = 24;
        const cameraIcon: string = `https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Circle-icons-camera.svg/${iconSize}px-Circle-icons-camera.svg.png`;
        const coordinates: Geolocation = element.coordinates;
        const mapPosition: MapLatLng = new google.maps.LatLng(coordinates.lat, coordinates.lng);

        const marker: MapMarker = new google.maps.Marker(
          {
            position: mapPosition,
            map: this.googleMaps,
            icon: cameraIcon,
            title: `${element.id} - ${element.name}`,
            animation: google.maps.Animation.DROP
          });
        marker.addListener('click', () => {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        });
      }, (index + 1) * 100);
    }
  }
  private onCameraChanged(camera: Camera) {
    /* TODO: Update the map to zoom on the current selection */
    this.selectedCamera = camera;
  }
  private onEventChanged(event: CameraEvent) {
    /* TODO: Update the map to zoom on the current selection */
    this.selectedCamera = event;
  }
}
