import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'

@Component({
  selector: 'app-camera-form',
  templateUrl: './camera-form.component.html',
  styleUrls: ['./camera-form.component.scss']
})
export class CameraFormComponent implements OnInit {
  @ViewChild('modalRef') public modal: ElementRef;
  // ======================================= //
  @Output() public onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() public onCancel: EventEmitter<any> = new EventEmitter();
  // ======================================= //
  @Input() public title: string;
  @Input() public icon: string;
  @Input() public isvalid: boolean;
  // ======================================= //
  constructor() { }
  ngOnInit() { }
  // ======================================= //
  public saveForm() {
    this.modal.nativeElement.click();
    this.onSubmit.next();
  }
  public cancelForm() {
    if (confirm('Are you sure?')) {
      this.modal.nativeElement.click();
      this.onCancel.next();
    }
  }
}
