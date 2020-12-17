import { BehaviorSubject, Observable } from 'rxjs'
import { tap                         } from 'rxjs/operators'
import { HttpClient                  } from '@angular/common/http'
import { EventEmitter   , Injectable } from '@angular/core'
import { LogScope                    } from '@common/enums/logscope.enum'
import { KeyValue                    } from '@common/helpers/key-value'
import { MapOptions                  } from '@common/helpers/map.config'
import { CameraEvent                 } from '@common/models/camera-event.model'
import { Camera                      } from '@common/models/camera.model'
import { LoggerService               } from '@common/services/logger.service'
import { environment                 } from '@env/environment.prod'
import { Loader                      } from '@googlemaps/js-api-loader'

@Injectable()
export class CameraMapService {
  // ======================================= //
  private _camRefresh: EventEmitter<void> = new EventEmitter();
  private _cameraList: Camera[] = new Array<Camera>();
  private _eventsList: KeyValue<Camera, Array<CameraEvent>> = new KeyValue();
  // ======================================= //
  public cameraList$: BehaviorSubject<Camera[]> = new BehaviorSubject(this._cameraList);
  public eventsList$: Observable<CameraEvent[]> = new BehaviorSubject(this._eventsList.value);
  // ======================================= //
  constructor(private options: MapOptions, private logger: LoggerService, private http: HttpClient) {
    this.getCameras();
    this.setEventListener();
  }
  // ======================================= //
  private async getCameras(): Promise<Camera[]> {
    return await this.http
      .get<Camera[]>('cameras')
      .pipe(tap(result => this._cameraList = result))
      .pipe(tap(result => this.cameraList$.next(result)))
      .pipe(tap(result => {
        this.logger.log(LogScope.Cameras, result)
      }))
      .toPromise()
  }
  private setEventListener() {
    this.eventsList$ = new Observable<CameraEvent[]>(
      emitter => {
        setInterval(() => {
          if (this._eventsList?.key) {
            console.log('Gotcha!');
            this._eventsList?.value?.push(new CameraEvent(this._eventsList?.key));
            emitter.next(this._eventsList.value.slice());
          }
        }, 5000);
        this._camRefresh
          .subscribe(() => emitter.next(this._eventsList.value.slice()));
      });
  }
  public async loadMap(element: HTMLElement): Promise<GoogleMap> {
    await new Loader({ apiKey: atob(environment.googleApi), region: this.options.region })
      .load();
    return new google.maps.Map(element, this.options.config) as GoogleMap;
  }
  public getCameraEvents(camera: Camera) {
    if (this._eventsList?.key != camera) {
      this._eventsList = { key: camera, value: new Array<CameraEvent>() };
      this._camRefresh.next();
    }
  }
  public getEventById(id: number): CameraEvent {
    return this._eventsList.value
      .slice()
      .find(x => x.id == id);
  }
  public getCameraById(id: number): Camera {
    return this._cameraList
      .slice()
      .find(x => x.id == id);
  }
}
export type GoogleMap = google.maps.Map;
export type MapLatLng = google.maps.LatLng;
export type MapMarker = google.maps.Marker;