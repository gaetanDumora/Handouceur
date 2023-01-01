import { Component, Inject, OnInit, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
  constructor(
    private viewContainerRef: ViewContainerRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.viewContainerRef.createComponent(this.data.component);
  }
}
