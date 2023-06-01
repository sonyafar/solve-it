import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiddersMethodComponent } from './ridders-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalculusRiddersMethodModule } from './calculus-ridders-method/calculus-ridders-method.module';
import { NgxGistModule } from '@ekkolon/ngx-gist';



@NgModule({
  declarations: [
    RiddersMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    CalculusRiddersMethodModule,
    NgxGistModule
  ],
  exports: [
    RiddersMethodComponent
  ]
})
export class RiddersMethodModule { }
