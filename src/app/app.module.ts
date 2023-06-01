import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsMethodModule } from './pages/bs-method/bs-method.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecantMethodModule } from './pages/secant-method/secant-method.module';
import { GrMethodModule } from './pages/gr-method/gr-method.module';
import { NewtonMethodModule } from './pages/newton-method/newton-method.module';
import { HomeModule } from './pages/home/home.module';
import { BruteForceModule } from './pages/brute-force/brute-force.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterModule } from './shared/components/footer/footer.module';
import { HalleyMethodModule } from './pages/halley-method/halley-method.module';
import { FalsePositionMethodModule } from './pages/false-postion-method/false-postion-method.module';
import { MathjaxModule } from 'mathjax-angular';
import { RiddersMethodModule } from './pages/ridders-method/ridders-method.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsMethodModule,
    GrMethodModule,
    SecantMethodModule,
    NewtonMethodModule,
    FontAwesomeModule,
    HomeModule,
    BruteForceModule,
    HalleyMethodModule,
    FalsePositionMethodModule,
    RiddersMethodModule,
    FooterModule,
    MathjaxModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
