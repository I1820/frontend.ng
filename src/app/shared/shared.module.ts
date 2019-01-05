import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendModule } from './backend';
import { AuthenticationModule } from './authentication';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticationModule,
    BackendModule,
  ]
})
export class SharedModule { }
