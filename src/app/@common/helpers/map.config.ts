import { Geolocation } from '@common/models/geolocation.model';

export class MapOptions {
  public apiKey   : string;
  public language?: string;
  public region  ?: string;
  public config?: { center: Geolocation, zoom: number };
}