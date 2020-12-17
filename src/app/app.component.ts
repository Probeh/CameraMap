
import { Component } from '@angular/core'
import { Camera } from '@common/models/camera.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public current: Camera;
}
