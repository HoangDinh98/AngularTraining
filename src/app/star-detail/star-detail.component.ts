import { Component, OnInit, Input } from '@angular/core';
import { Star } from '../star';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StarService }  from '../star.service';

@Component({
  selector: 'app-star-detail',
  templateUrl: './star-detail.component.html',
  styleUrls: ['./star-detail.component.css']
})
export class StarDetailComponent implements OnInit {
  @Input() star: Star;

  constructor(
    private route: ActivatedRoute,
    private starService: StarService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getStar();
  }
  
  getStar(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.starService.getStar(id)
      .subscribe(star => this.star = star);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.starService.updateStar(this.star)
      .subscribe(() => this.goBack());
  }

}
