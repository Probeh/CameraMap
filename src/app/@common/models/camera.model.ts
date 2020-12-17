
import { CameraType } from '@common/enums/camera-type.enum'
import { Geolocation } from '@common/models/geolocation.model'
import { ModelBase } from '@common/models/model-base.model'

export class Camera extends ModelBase<Camera> {
  // ======================================= //
  public coordinates: Geolocation;
  // ======================================= //
  constructor(name?: CameraType | string, id?: number, coordinates?: Geolocation) {
    super(name, id);
    // ======================================= //
    this.coordinates = coordinates;
  }
}