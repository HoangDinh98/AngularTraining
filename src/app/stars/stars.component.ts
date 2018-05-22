import { Component, OnInit } from '@angular/core';
import { Star } from '../star';
import { STARS } from '../mock-stars';
import { StarService } from '../star.service';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  // star = 'Orion Rigel';

  // star: Star = {
  //   id: 1,
  //   name: 'Orion Rigel'
  // };

  // stars = STARS;

  constructor(private starService: StarService) { }

  stars: Star[];

  // selectedStar: Star;

  ngOnInit() {
    this.getStars();
  }

  // onSelect(star: Star): void {
  //   this.selectedStar = star;
  // }

  getStars(): void {
    this.starService.getStars()
        .subscribe(stars => this.stars = stars);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.starService.addStar({ name } as Star)
      .subscribe(star => {
        this.stars.push(star);
      });
  }

  delete(star: Star): void {
    this.stars = this.stars.filter(s => s !== star);
    this.starService.deleteStar(star).subscribe();
  }

}
