import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BruteForceComponent } from './brute-force.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalculusBruteForceComponent } from './calculus-brute-force/calculus-brute-force.component';
import { NgxGistModule } from '@ekkolon/ngx-gist';



@NgModule({
  declarations: [
    BruteForceComponent,
    CalculusBruteForceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxGistModule
  ],
  exports: [
    BruteForceComponent
  ]
})
export class BruteForceModule { }
