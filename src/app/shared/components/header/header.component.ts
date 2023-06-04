import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() selectorVisible: boolean = false;
  
  scrolled: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.onScroll();
  }

  onScroll() {
    document.addEventListener("scroll", (event) => {
      this.scrolled = window.scrollY > 120;
    });
  }
}
