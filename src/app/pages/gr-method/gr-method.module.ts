import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrMethodComponent } from './gr-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxGgistModule } from 'ngx-ggist';
import { CalculusGrMethodModule } from './calculus-gr-method/calculus-gr-method.module';



@NgModule({
  declarations: [
    GrMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGgistModule,
    CalculusGrMethodModule
  ],
  exports: [
    GrMethodComponent
  ]
})
export class GrMethodModule { }
