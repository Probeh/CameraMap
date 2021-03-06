import { BehaviorSubject, Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { EventEmitter, Injectable } from '@angular/core'
import { LoggerScope } from '@common/enums/logger-scope.enum'
import { KeyValue } from '@common/helpers/key-value'
import { MapOptions } from '@common/helpers/map.config'
import { CameraEvent } from '@common/models/camera-event.model'
import { Camera } from '@common/models/camera.model'
import { LoggerService } from '@common/services/logger.service'
import { environment } from '@env/environment.prod'
import { Loader } from '@googlemaps/js-api-loader'

@Injectable()
export class CameraMapService {
  // ======================================= //
  private _camRefresh: EventEmitter<void> = new EventEmitter();
  private _cameraList: Camera[] = new Array<Camera>();
  private _eventsList: KeyValue<Camera, Array<CameraEvent>> = new KeyValue();
  // ======================================= //
  public cameraList$: BehaviorSubject<Camera[]> = new BehaviorSubject(this._cameraList?.slice());
  public eventsList$: Observable<CameraEvent[]> = new BehaviorSubject(this._eventsList.value?.slice());
  // ======================================= //
  constructor(private options: MapOptions, private logger: LoggerService, private http: HttpClient) {
    this.getCameras();
    this.setEventListener();
  }
  // ======================================= //

  private async getCameras(): Promise<Camera[]> {
    return await this.http
      .get<Camera[]>('cameras')
      .pipe(tap(result => this._cameraList = result.map(cam => new Camera(cam.name, cam.id, cam.coordinates))))
      .pipe(tap(result => this.cameraList$.next(result)))
      .pipe(tap(result => this.logger.log(LoggerScope.Cameras, result)))
      .toPromise()
  }
  private setEventListener() {
    this.eventsList$ = new Observable<CameraEvent[]>(
      emitter => {
        setInterval(() => {
          if (this._eventsList?.key) {
            this._eventsList?.value?.push(new CameraEvent(this._eventsList?.key, this._eventsList?.value.length + 1).random());
            emitter.next(this._eventsList.value.slice());
          }
        }, 500);
        this._camRefresh
          .subscribe(() => emitter.next(this._eventsList.value.slice()));
      });
  }
  public async loadMap(element: HTMLElement): Promise<GoogleMap> {
    await new Loader({ apiKey: atob(environment.googleApi), region: this.options.region })
      .load();
    return new google.maps.Map(element, this.options.config) as GoogleMap;
  }
  public addCamera(camera: Camera) {
    this._cameraList.push(camera);
    this.cameraList$.next(this._cameraList.slice());
  }
  public getCameraEvents(camera: Camera) {
    if (this._eventsList?.key != camera) {
      this._eventsList = { key: camera, value: new Array<CameraEvent>() };
      this._camRefresh.next();
    }
  }
  public refreshEvents(camera: Camera) {
    this._eventsList = { key: camera, value: new Array<CameraEvent>() };
    this._camRefresh.next();
  }
}
export type GoogleMap = google.maps.Map;
export type MapLatLng = google.maps.LatLng;
export type MapMarker = google.maps.Marker;
export type MarkerOptions = google.maps.ReadonlyMarkerOptions;