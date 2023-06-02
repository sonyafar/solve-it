import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsMethodComponent } from './bs-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxGistModule } from '@ekkolon/ngx-gist';
import { CalculusBsMethodModule } from './calculus-bs-method/calculus-bs-method.module';



@NgModule({
  declarations: [
    BsMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGistModule,
    CalculusBsMethodModule
  ],
  exports: [
    BsMethodComponent
  ]
})
export class BsMethodModule { }
