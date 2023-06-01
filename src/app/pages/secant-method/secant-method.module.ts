import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecantMethodComponent } from './secant-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalculusSecantMethodComponent } from './calculus-secant-method/calculus-secant-method.component';
import { NgxGistModule } from '@ekkolon/ngx-gist';



@NgModule({
  declarations: [
    SecantMethodComponent,
    CalculusSecantMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGistModule
  ],
  exports: [
    SecantMethodComponent
  ]
})
export class SecantMethodModule { }
