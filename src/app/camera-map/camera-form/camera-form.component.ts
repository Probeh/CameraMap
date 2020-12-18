import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-camera-form',
  templateUrl: './camera-form.component.html',
  styleUrls: ['./camera-form.component.scss']
})
export class CameraFormComponent implements OnInit {
  // ======================================= //
  @Output() public onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() public onCancel: EventEmitter<any> = new EventEmitter();
  @Input() public title: string;
  @Input() public icon: string;
  @Input() public isvalid: boolean;
  @Input() public changed: boolean;
  // ======================================= //
  constructor() { }
  ngOnInit() { }
  // ======================================= //
  public saveForm() {
    this.onSubmit.next();
  }
  public cancelForm() {
    if (confirm('Are you sure?'))
      this.onCancel.next();
  }
}
