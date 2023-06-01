import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecantMethodComponent } from './secant-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxGgistModule } from 'ngx-ggist';
import { CalculusSecantMethodComponent } from './calculus-secant-method/calculus-secant-method.component';



@NgModule({
  declarations: [
    SecantMethodComponent,
    CalculusSecantMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGgistModule
  ],
  exports: [
    SecantMethodComponent
  ]
})
export class SecantMethodModule { }
