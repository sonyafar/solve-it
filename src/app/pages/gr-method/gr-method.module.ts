import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrMethodComponent } from './gr-method.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalculusGrMethodModule } from './calculus-gr-method/calculus-gr-method.module';
import { NgxGistModule } from '@ekkolon/ngx-gist';



@NgModule({
  declarations: [
    GrMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    CalculusGrMethodModule,
    NgxGistModule
  ],
  exports: [
    GrMethodComponent
  ]
})
export class GrMethodModule { }
