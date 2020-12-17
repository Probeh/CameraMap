import { EventType } from '@common/enums/event-type.enum'
import { Camera } from '@common/models/camera.model'
import { Geolocation } from '@common/models/geolocation.model'
import { ModelBase } from '@common/models/model-base.model';

export class CameraEvent extends ModelBase<CameraEvent> {
  // ======================================= //
  public cameraId   : number     ;
  public camera     : Camera     ;
  public coordinates: Geolocation;
  // ======================================= //
  constructor(camera: Camera, id?: number, event?: EventType, coordinates?: Geolocation) {
    super(event, id);
    // ======================================= //
    this.camera      = camera        ;
    this.cameraId    = camera     .id;
    this.coordinates = coordinates   ;
  }
  // ======================================= //
  public random() {

  }
}
