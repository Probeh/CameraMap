
import { Component } from '@angular/core'
import { CameraEvent } from '@common/models/camera-event.model';
import { Camera } from '@common/models/camera.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public currentCamera: Camera;
  public currentEvent: CameraEvent;
}
