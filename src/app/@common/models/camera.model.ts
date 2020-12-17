import { CameraType } from '@common/enums/camera-type.enum'
import { Geolocation } from '@common/models/geolocation.model'
export interface Camera {
  id: number;
  name: CameraType | string;
  coordinates: Geolocation;
  description?: string;
}