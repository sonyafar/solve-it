import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsMethodComponent } from './bs-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxGgistModule } from 'ngx-ggist';
import { CalculusBsMethodComponent } from './calculus-bs-method/calculus-bs-method.component';



@NgModule({
  declarations: [
    BsMethodComponent,
    CalculusBsMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGgistModule
  ],
  exports: [
    BsMethodComponent
  ]
})
export class BsMethodModule { }
