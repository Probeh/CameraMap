import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Camera } from '@common/models/camera.model'

@Component({
  selector: 'app-camera-form',
  templateUrl: './camera-form.component.html',
  styleUrls: ['./camera-form.component.scss']
})
export class CameraFormComponent implements OnInit {
  @ViewChild('modalRef') public modal: ElementRef;
  @Output() public onSubmit: EventEmitter<Camera> = new EventEmitter();
  @Input() formGroup: FormGroup;
  @Input() formTitle: string;
  // ======================================= //
  constructor() { }
  ngOnInit() { }
  // ======================================= //
  public submitForm() {
    this.onSubmit.next();
    this.formGroup?.reset();
    this.modal.nativeElement.click();
  }
  public cancelForm() {
    if (confirm('Are you sure?')) {
      this.modal.nativeElement.click();
      this.formGroup?.reset();
    }
  }
}
