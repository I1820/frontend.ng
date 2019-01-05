import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatCheckboxModule,
  MatFormFieldModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ],
  exports: [
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ]
})
export class MaterialModule { }
