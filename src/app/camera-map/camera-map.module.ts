import { CommonModule                            } from '@angular/common'
import { HTTP_INTERCEPTORS    , HttpClientModule } from '@angular/common/http'
import { ModuleWithProviders  , NgModule         } from '@angular/core'
import { ReactiveFormsModule                     } from '@angular/forms'
import { CameraEventsComponent                   } from '@cameramap/camera-events/camera-events.component'
import { CameraFormComponent                     } from '@cameramap/camera-form/camera-form.component'
import { CameraListComponent                     } from '@cameramap/camera-list/camera-list.component'
import { CameraMapComponent                      } from '@cameramap/camera-map.component'
import { MapOptions                              } from '@common/helpers/map.config'
import { CameraFormService                       } from '@common/services/camera-form.service'
import { CameraMapService                        } from '@common/services/camera-map.service'
import { LoggerService                           } from '@common/services/logger.service'
import { ResourceInterceptor                     } from '@common/services/resource.interceptor'

const components = [CameraMapComponent, CameraFormComponent, CameraListComponent, CameraEventsComponent]

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  declarations: components,
  exports: components,
  providers: [LoggerService, CameraMapService, CameraFormService],
})
export class CameraMapModule {
  static forRoot(options: MapOptions): ModuleWithProviders<CameraMapModule> {
    return {
      ngModule: CameraMapModule,
      providers: [
        { provide: MapOptions, useValue: options },
        { provide: HTTP_INTERCEPTORS, useClass: ResourceInterceptor, multi: true },
        LoggerService,
        CameraMapService,
        CameraFormService
      ]
    };
  }
}