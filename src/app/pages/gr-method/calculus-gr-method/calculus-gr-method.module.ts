import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculusGrMethodComponent } from './calculus-gr-method.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CalculusGrMethodComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CalculusGrMethodComponent
  ]
})
export class CalculusGrMethodModule { }
