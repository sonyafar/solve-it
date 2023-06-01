import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { BsMethodComponent } from './pages/bs-method/bs-method.component';
import { SecantMethodComponent } from './pages/secant-method/secant-method.component';
import { GrMethodComponent } from './pages/gr-method/gr-method.component';
import { NewtonMethodComponent } from './pages/newton-method/newton-method.component';
import { HomeComponent } from './pages/home/home.component';
import { BruteForceComponent } from './pages/brute-force/brute-force.component';
import { HalleyMethodComponent } from './pages/halley-method/halley-method.component';
import { FalsePositionMethodComponent } from './pages/false-postion-method/false-postion-method.component';
import { RiddersMethodComponent } from './pages/ridders-method/ridders-method.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'bisection-method',
    component: BsMethodComponent
  },
  {
    path: 'secant-method',
    component: SecantMethodComponent
  },
  {
    path: 'golden-ratio-method',
    component: GrMethodComponent
  },
  {
    path: 'newton-method',
    component: NewtonMethodComponent
  },
  {
    path: 'brute-force',
    component: BruteForceComponent
  },
  {
    path: 'halley-method',
    component: HalleyMethodComponent
  },
  {
    path: 'false-postion-method',
    component: FalsePositionMethodComponent
  },
  {
    path: 'ridders-method',
    component: RiddersMethodComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  useHash: true,
  onSameUrlNavigation: 'reload',
  // scrollOffset: [0, 2890],
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions) ],
  providers: [],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
