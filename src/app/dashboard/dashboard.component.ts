import { Component, OnInit } from '@angular/core';
import { Star } from '../star';
import { StarService } from '../star.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  stars: Star[] = [];

  constructor(private starService: StarService) { }

  ngOnInit() {
    this.getStars();
  }

  getStars(): void {
    this.starService.getStars().subscribe(stars => this.stars = stars.slice(0, 4));
  }
}