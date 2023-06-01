import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FalsePositionMethodComponent } from './false-postion-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxGgistModule } from 'ngx-ggist';
import { CalculusFalsePositionMethodComponent } from './calculus-false-position-method/calculus-false-position-method.component';



@NgModule({
  declarations: [
    FalsePositionMethodComponent,
    CalculusFalsePositionMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGgistModule
  ],
  exports: [
    FalsePositionMethodComponent
  ]
})
export class FalsePositionMethodModule { }
