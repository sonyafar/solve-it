import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewtonMethodComponent } from './newton-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxGgistModule } from 'ngx-ggist';
import { CalculusNewtonMethodComponent } from './calculus-newton-method/calculus-newton-method.component';



@NgModule({
  declarations: [
    NewtonMethodComponent,
    CalculusNewtonMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGgistModule
  ],
  exports: [
    NewtonMethodComponent
  ]
})
export class NewtonMethodModule { }
