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

import {
  DragDropModule
} from '@angular/cdk/drag-drop';


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
    DragDropModule,
  ],
  exports: [
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    DragDropModule,
  ]
})
export class MaterialModule { }
