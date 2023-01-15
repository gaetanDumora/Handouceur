import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { DialogComponent } from './dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  private defaulConfig: MatDialogConfig = {
    height: '60%',
    width: '45%',
  };

  public open<T>(
    component: ComponentType<T> | TemplateRef<T>,
    inputs: unknown
  ): Observable<any> {
    this.defaulConfig.data = { component, inputs };
    const dialogRef = this.dialog.open(DialogComponent, this.defaulConfig);

    return dialogRef.afterClosed();
  }
}
