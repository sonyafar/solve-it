import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiddersMethodComponent } from './ridders-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxGgistModule } from 'ngx-ggist';
import { CalculusRiddersMethodModule } from './calculus-ridders-method/calculus-ridders-method.module';



@NgModule({
  declarations: [
    RiddersMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGgistModule,
    CalculusRiddersMethodModule
  ],
  exports: [
    RiddersMethodComponent
  ]
})
export class RiddersMethodModule { }
