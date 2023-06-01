import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsMethodComponent } from './bs-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalculusBsMethodComponent } from './calculus-bs-method/calculus-bs-method.component';
import { NgxGistModule } from '@ekkolon/ngx-gist';



@NgModule({
  declarations: [
    BsMethodComponent,
    CalculusBsMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGistModule
  ],
  exports: [
    BsMethodComponent
  ]
})
export class BsMethodModule { }
