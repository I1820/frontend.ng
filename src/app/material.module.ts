import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatTableModule,
  MatSortModule,
  MatSelectModule,
  MatDialogModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
  ],
  exports: [
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
  ]
})
export class MaterialModule { }
