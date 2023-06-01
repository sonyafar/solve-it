import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Solve it.';

  selectorVisible: boolean = false;

  @HostListener('window:scroll', ['$event']) // for window scroll events
  
  onScroll(event: any) {
    this.selectorVisible = true;
  }

  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    viewportScroller.setOffset([0, 130]);
    router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: any) => {
      if (e.anchor) {
        // anchor navigation
        /* setTimeout is the core line to solve the solution */
        setTimeout(() => {
          viewportScroller.scrollToAnchor(e.anchor);
        })
      } else if (e.position) {
        // backward navigation
        viewportScroller.scrollToPosition(e.position);
      } else {
        // forward navigation
        viewportScroller.scrollToPosition([0, 0]);
      }
    });
    
  }

}
