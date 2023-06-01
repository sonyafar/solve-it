import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FalsePositionMethodComponent } from './false-postion-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalculusFalsePositionMethodComponent } from './calculus-false-position-method/calculus-false-position-method.component';
import { NgxGistModule } from '@ekkolon/ngx-gist';



@NgModule({
  declarations: [
    FalsePositionMethodComponent,
    CalculusFalsePositionMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGistModule
  ],
  exports: [
    FalsePositionMethodComponent
  ]
})
export class FalsePositionMethodModule { }
