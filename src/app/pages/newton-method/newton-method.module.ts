import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewtonMethodComponent } from './newton-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalculusNewtonMethodComponent } from './calculus-newton-method/calculus-newton-method.component';
import { NgxGistModule } from '@ekkolon/ngx-gist';



@NgModule({
  declarations: [
    NewtonMethodComponent,
    CalculusNewtonMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGistModule
  ],
  exports: [
    NewtonMethodComponent
  ]
})
export class NewtonMethodModule { }
