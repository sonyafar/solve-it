import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-calculus-ridders',
  templateUrl: './calculus-ridders-method.component.html',
  styleUrls: ['./calculus-ridders-method.component.css'],
  providers: [ GlobalService ]
})
export class CalculusRiddersMethodComponent implements OnChanges, OnInit {

  content: string = '$$x_3 = x_1 + (x_1 - x_0) \\cdot \\frac{sign[f(x_0) \\cdot f(x_1)}{\\sqrt{f(x_1)^2 - f(x_0) * f(x_2)}} $$';
  mathJaxObject: any; 

  constructor(private gs:GlobalService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['content']) {
      this.renderMath()
    }
  }

  ngOnInit(): void {
    this.loadMathConfig()
    this.renderMath();
  }

  renderMath(){
    this.mathJaxObject  = this.gs.nativeGlobal()['MathJax'] ;
    let angObj = this;

    setTimeout(()=> {
      angObj.mathJaxObject.Hub.Queue(["Typeset",angObj.mathJaxObject.Hub],'mathContent');
    },1000);
  } 
  
  loadMathConfig(){
  
  this.mathJaxObject  = this.gs.nativeGlobal()['MathJax'] ;
      this.mathJaxObject.Hub.Config({        
        showMathMenu: false,
        tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
        menuSettings: { zoom: "Double-Click",zscale: "150%" },
        CommonHTML: { linebreaks: { automatic: true } },
        "HTML-CSS": { linebreaks: { automatic: true } },
               SVG: { linebreaks: { automatic: true } }
      });
    } 
}
