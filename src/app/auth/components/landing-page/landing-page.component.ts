import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss', '../../../../styles.scss'],
})
export class LandingPageComponent implements OnInit {
  landing: string = 'landing';
  constructor() {}

  ngOnInit(): void {}
}
