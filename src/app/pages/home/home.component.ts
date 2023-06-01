import { Component } from '@angular/core';
import { Tool } from 'src/app/models/tool.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tools: Tool[] = [];

  constructor() {
    this.getTools();
  }

  getTools() {
    this.tools = [
      {
        title: 'Bisection Method',
        href: '/bisection-method'
      },
      {
        title: 'Secant Method',
        href: '/secant-method'
      },
      {
        title: 'Golden-section Search',
        href: '/golden-ratio-method'
      },
      {
        title: 'Newton Raphson Method',
        href: '/newton-method'
      },
      {
        title: 'Brute Force Method',
        href: '/brute-force'
      },
      {
        title: "Halley's Method",
        href: '/halley-method'
      },
      {
        title: 'False Position Method',
        href: '/false-postion-method'
      },
      {
        title: "Ridders's Method",
        href: '/ridders-method'
      }
    ]
  }
}
