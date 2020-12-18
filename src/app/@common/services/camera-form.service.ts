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
        lat: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d*)?$')]),
        lng: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d*)?$')])
      }),
      description: new FormControl('')
    });
    return this.cameraForm;
  }
}
