import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent implements OnInit {
  @Input() page!: string;
  align!:string
  constructor() {}

  ngOnInit(): void {
    this.align = this.page == 'home' ? 'end' : 'spread'
  }
}
