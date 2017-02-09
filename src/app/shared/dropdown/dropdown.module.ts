import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './';
import { SelectPipe } from './';

@NgModule({
  imports: [
      CommonModule
  ],
  declarations: [
    DropdownComponent,
    SelectPipe
  ],
  exports: [
      DropdownComponent
  ]
})
export class DropdownModule {}

