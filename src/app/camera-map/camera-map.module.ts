import { CommonModule                        } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ModuleWithProviders, NgModule       } from '@angular/core'
import { CameraEventsComponent               } from '@cameramap/camera-events/camera-events.component'
import { CameraListComponent                 } from '@cameramap/camera-list/camera-list.component'
import { CameraMapComponent                  } from '@cameramap/camera-map.component'
import { MapOptions                          } from '@common/helpers/map.config'
import { CameraMapService                    } from '@common/services/camera-map.service'
import { ResourceInterceptor                 } from '@common/services/resource.interceptor'

const components = [CameraMapComponent, CameraListComponent, CameraEventsComponent]

@NgModule({
  imports     : [CommonModule     , HttpClientModule],
  declarations:  components       ,
  exports     :  components       ,
  providers   : [CameraMapService],
})
export class CameraMapModule {
  static forRoot(options: MapOptions): ModuleWithProviders<CameraMapModule> {
    return {
      ngModule: CameraMapModule,
      providers: [
        { provide: MapOptions, useValue: options },
        { provide: HTTP_INTERCEPTORS, useClass: ResourceInterceptor, multi: true },
        CameraMapService,
      ]
    };
  }
}