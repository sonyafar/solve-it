import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecantMethodComponent } from './secant-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxGistModule } from '@ekkolon/ngx-gist';
import { CalculusSecantMethodModule } from './calculus-secant-method/calculus-secant-method.module';



@NgModule({
  declarations: [
    SecantMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGistModule,
    CalculusSecantMethodModule
  ],
  exports: [
    SecantMethodComponent
  ]
})
export class SecantMethodModule { }
