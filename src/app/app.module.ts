import { NgModule            } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule       } from '@angular/platform-browser'
import { AppComponent        } from '@app/app.component'
import { NavbarComponent     } from '@app/navbar/navbar.component'
import { CameraMapModule     } from '@cameramap/camera-map.module'
import { environment         } from '@env/environment.prod'

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  providers: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CameraMapModule.forRoot({
      apiKey: environment.googleApi,
      region: 'IL',
      config: {
        center: { lat: 32.083333, lng: 34.7999968 },
        zoom: 13
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }