import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class CameraFormService {
  // ======================================= //
  private cameraForm: FormGroup;
  // ======================================= //
  constructor() { }
  // ======================================= //
  public createForm(): FormGroup {
    this.cameraForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', Validators.required),
      coordinates: new FormGroup({
        lat: new FormControl(0, Validators.required),
        lng: new FormControl(0, Validators.required)
      }),
      description: new FormControl('')
    });
    return this.cameraForm;
  }
}
