import { EventType } from '@common/enums/event-type.enum'
import { Camera } from '@common/models/camera.model'
import { Geolocation } from '@common/models/geolocation.model'
export class CameraEvent {
  // ======================================= //
  public id         : number     ;
  public cameraId   : number     ;
  public camera     : Camera     ;
  public occurence  : Date       ;
  public name       : EventType  ;
  public description: string     ;
  public coordinates: Geolocation;
  // ======================================= //
  constructor(camera: Camera) {
    this.camera    = camera       ;
    this.cameraId  = camera.id    ;
    this.occurence = new Date  () ;
  }
  // ======================================= //
  public random() {

  }
}
